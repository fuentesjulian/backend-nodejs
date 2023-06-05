const replace = (obj, from, to) => {
  obj[to] = obj[from];
  delete obj[from];
  return obj;
};

export default replace;
