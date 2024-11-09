async function loadDistricts() {
    const state = document.getElementById('State_Name').value;
    const districtSelect = document.getElementById('District_Name');
    districtSelect.innerHTML = '<option value="">Select District</option>';

    if (state) {
        try {
            const response = await fetch(`/districts?state=${state}`);
            const districts = await response.json();
            districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    }

    // Clear city and blood group dropdowns
    document.getElementById('City_Name').innerHTML = '<option value="">Select City</option>';
    document.getElementById('Blood_Group').innerHTML = '<option value="">Select Blood Group</option>';
}

async function loadCities() {
    const state = document.getElementById('State_Name').value;
    const district = document.getElementById('District_Name').value;
    const citySelect = document.getElementById('City_Name');
    citySelect.innerHTML = '<option value="">Select City</option>';

    if (state && district) {
        try {
            const response = await fetch(`/cities?state=${state}&district=${district}`);
            const cities = await response.json();
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    }

    // Clear blood group dropdown
    document.getElementById('Blood_Group').innerHTML = '<option value="">Select Blood Group</option>';
}

async function loadBloodGroups() {
    const state = document.getElementById('State_Name').value;
    const district = document.getElementById('District_Name').value;
    const city = document.getElementById('City_Name').value;
    const bloodGroupSelect = document.getElementById('Blood_Group');
    bloodGroupSelect.innerHTML = '<option value="">Select Blood Group</option>';

    if (state && district && city) {
        try {
            const response = await fetch(`/blood-groups?state=${state}&district=${district}&city=${city}`);
            const bloodGroups = await response.json();
            bloodGroups.forEach(group => {
                const option = document.createElement('option');
                option.value = group;
                option.textContent = group;
                bloodGroupSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error fetching blood groups:", error);
        }
    }
}