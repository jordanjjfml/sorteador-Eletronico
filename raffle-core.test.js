import test from 'node:test';
import assert from 'node:assert/strict';
import { validateRange, createNumberPool, drawUniqueValue, parseCsvNames } from './raffle-core.js';

test('valida intervalo numérico corretamente', () => {
  assert.equal(validateRange(1, 10), true);
  assert.equal(validateRange(10, 1), false);
  assert.equal(validateRange(NaN, 5), false);
});

test('cria pool incluindo o limite máximo', () => {
  assert.deepEqual(createNumberPool(1, 3), [1, 2, 3]);
});

test('remove o valor sorteado do pool ao ativar repetição bloqueada', () => {
  const pool = [1, 2, 3];
  const value = drawUniqueValue(pool);

  assert.ok([1, 2, 3].includes(value));
  assert.equal(pool.length, 2);
  assert.ok(!pool.includes(value));
});

test('parse de nomes ignora itens vazios', () => {
  assert.deepEqual(parseCsvNames('Ana, Bruno, Carlos, ,  '), ['Ana', 'Bruno', 'Carlos']);
});
