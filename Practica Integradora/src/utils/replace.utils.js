const replace = (obj, from, to) => {
  obj[to] = obj[from];
  delete obj[from];
  console.log(obj)
  return obj;
};

export default replace;
