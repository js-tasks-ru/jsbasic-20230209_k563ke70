function ucFirst(str) {
  if (!str) {
    return str.toUpperCase();
  }
  return str[0].toUpperCase() + str.slice(1);
}
