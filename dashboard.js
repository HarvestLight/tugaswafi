document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.getElementById('home-link');
    const databaseLink = document.getElementById('database-link');
    const homeSection = document.getElementById('home-section');
    const databaseSection = document.getElementById('database-section');
    const saveButton = document.getElementById('save-button');

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveSection(homeSection);
    });

    databaseLink.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveSection(databaseSection);
        loadData();
    });

    saveButton.addEventListener('click', (e) => {
        e.preventDefault();
        saveAllData();
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
        }
    }

    function deleteData(row) {
        dataTable.deleteRow(row.rowIndex - 1);
    }

    function saveData(data) {
        fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(message => console.log(message))
        .catch(error => console.error('Error:', error));
    }

    function saveAllData() {
        const rows = dataTable.rows;
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const data = {
                name: row.cells[0].textContent,
                amount: row.cells[1].textContent,
                location: row.cells[2].textContent
            };
            saveData(data);
        }
    }

    function loadData() {
        fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => addData(item));
        })
        .catch(error => console.error('Error:', error));
    }
});