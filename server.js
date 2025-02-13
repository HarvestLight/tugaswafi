document.addEventListener('DOMContentLoaded', () => {
  const homeLink = document.getElementById('home-link');
  const databaseLink = document.getElementById('database-link');
  const homeSection = document.getElementById('home-section');
  const databaseSection = document.getElementById('database-section');

  homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveSection(homeSection);
  });

  databaseLink.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveSection(databaseSection);
      loadData();
  });

  function setActiveSection(section) {
      document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
      section.classList.add('active');
  }

  // Default to showing the home section
  setActiveSection(homeSection);

  // Data management functionality
  const dataForm = document.getElementById('data-form');
  const nameInput = document.getElementById('name-input');
  const amountInput = document.getElementById('amount-input');
  const locationInput = document.getElementById('location-input');
  const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];

  dataForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
          name: nameInput.value || 'N/A',
          amount: amountInput.value || 'N/A',
          location: locationInput.value || 'N/A'
      };
      addData(data);
      saveData(data);
      nameInput.value = '';
      amountInput.value = '';
      locationInput.value = '';
  });

  function addData(data) {
      const row = dataTable.insertRow();
      const cellName = row.insertCell(0);
      const cellAmount = row.insertCell(1);
      const cellLocation = row.insertCell(2);
      const cellActions = row.insertCell(3);
      cellActions.classList.add('actions');

      cellName.textContent = data.name;
      cellAmount.textContent = data.amount;
      cellLocation.textContent = data.location;

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit');
      editButton.addEventListener('click', () => editData(row));

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete');
      deleteButton.addEventListener('click', () => deleteData(row));

      cellActions.appendChild(editButton);
      cellActions.appendChild(deleteButton);
  }

  function editData(row) {
      const newName = prompt('Edit name:', row.cells[0].textContent);
      const newAmount = prompt('Edit amount:', row.cells[1].textContent);
      const newLocation = prompt('Edit location:', row.cells[2].textContent);
      if (newName && newAmount && newLocation) {
          row.cells[0].textContent = newName;
          row.cells[1].textContent = newAmount;
          row.cells[2].textContent = newLocation;
          updateLocalStorage();
      }
  }

  function deleteData(row) {
      dataTable.deleteRow(row.rowIndex - 1);
      updateLocalStorage();
  }

  function saveData(data) {
      const existingData = JSON.parse(localStorage.getItem('data')) || [];
      existingData.push(data);
      localStorage.setItem('data', JSON.stringify(existingData));
  }

  function loadData() {
      // Clear the table before loading data
      dataTable.innerHTML = '';
      const data = JSON.parse(localStorage.getItem('data')) || [];
      data.forEach(item => addData(item));
  }

  function updateLocalStorage() {
      const rows = dataTable.rows;
      const data = [];
      for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const rowData = {
              name: row.cells[0].textContent,
              amount: row.cells[1].textContent,
              location: row.cells[2].textContent
          };
          data.push(rowData);
      }
      localStorage.setItem('data', JSON.stringify(data));
  }

  // Load data initially when the page loads
  loadData();
});