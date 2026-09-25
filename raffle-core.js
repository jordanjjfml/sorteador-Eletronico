function validateRange(min, max) {
  const minimum = Number(min);
  const maximum = Number(max);

  if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) {
    return false;
  }

  return minimum <= maximum;
}

function createNumberPool(min, max) {
  const minimum = Number(min);
  const maximum = Number(max);

  if (!validateRange(minimum, maximum)) {
    return [];
  }

  return Array.from({ length: maximum - minimum + 1 }, (_, index) => minimum + index);
}

function drawUniqueValue(pool) {
  if (!Array.isArray(pool) || pool.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * pool.length);
  const [value] = pool.splice(index, 1);
  return value;
}

function parseCsvNames(value) {
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

if (typeof window !== 'undefined') {
  window.RaffleCore = {
    validateRange,
    createNumberPool,
    drawUniqueValue,
    parseCsvNames,
  };
}

export { validateRange, createNumberPool, drawUniqueValue, parseCsvNames };
