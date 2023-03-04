function highlight(table) {
  // ваш код...
  for (let i = 1; i < table.rows.length; i++) {
    const access = table.rows[i].cells[3].dataset.available;
    if (access) {
      const status = access === 'true' ? 'available' : 'unavailable';
      table.rows[i].classList.add(status);
    } else {
      table.rows[i].hidden = true;
    }

    const gender = table.rows[i].cells[2].textContent === 'm' ? 'male' : 'female';
    table.rows[i].classList.add(gender);

    const age = table.rows[i].cells[1].textContent;
    if (age < 18) {
      table.rows[i].style.textDecoration = 'line-through';
    }
  }
}
