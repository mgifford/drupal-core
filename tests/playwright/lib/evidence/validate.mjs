/**
 * JSON Schema validation for evidence files, with Ajv (draft 2020-12).
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020Module from 'ajv/dist/2020.js';
import addFormatsModule from 'ajv-formats';

const Ajv2020 = Ajv2020Module.default ?? Ajv2020Module;
const addFormats = addFormatsModule.default ?? addFormatsModule;

export const SCHEMA_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../schemas');

const cache = new Map();

/** Returns a compiled validator for schemas/<name>.schema.json. */
export function validator(name) {
  if (!cache.has(name)) {
    const schema = JSON.parse(fs.readFileSync(path.join(SCHEMA_DIR, `${name}.schema.json`), 'utf8'));
    // strictRequired is off because the schema uses `required` inside
    // if/then branches whose properties are declared on the parent.
    const ajv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false });
    addFormats(ajv);
    cache.set(name, ajv.compile(schema));
  }
  return cache.get(name);
}

/** Validates data; returns { valid, errors } with readable error strings. */
export function validate(name, data) {
  const check = validator(name);
  const valid = check(data);
  const errors = (check.errors ?? []).map((error) => `${error.instancePath || '/'} ${error.message}`);
  return { valid, errors };
}
