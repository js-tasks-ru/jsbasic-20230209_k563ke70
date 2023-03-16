/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.createTable();
  }

  createTable() {
    this.elem = document.createElement('TABLE');
    const tbody = document.createElement('TBODY');
    this.rows.forEach(item => {
      const tr = document.createElement('TR');
      for (const value of Object.values(item)) {
        const td = document.createElement('TD');
        td.textContent = `${value}`;
        tr.append(td);
      }
      const td = document.createElement('TD');
      const button = document.createElement('BUTTON');
      button.textContent = 'X';
      td.append(button);
      tr.append(td);
      tbody.append(tr)
    })

    this.elem.append(tbody)
    this.elem.addEventListener('click', this.deleteRow)
  }
  
  deleteRow(event) {
    const row = event.target.parentElement.parentElement
    const isButton = event.target.closest('button')
    if (isButton) {
      row.remove()
    }
  } 
}