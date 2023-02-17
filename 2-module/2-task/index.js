function isEmpty(obj) {
  // ваш код...
  for (key in obj) {
    return false;
  }
  return true;
}
