function confirmAction(adminId, bloodGroup, action) {
    const confirmMessage = action === 'remove' 
        ? `Do you want to remove ${bloodGroup} from the database?` 
        : `Do you want to add ${bloodGroup} to the database?`;

    if (confirm(confirmMessage)) {
        // Send a request to the server with the adminId, bloodGroup, and action
        fetch(`/update-blood-group/${adminId}/${bloodGroup}/${action}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Blood group ${action}ed successfully!`);
                location.reload(); // Reload the page to reflect changes
            } else {
                alert('An error occurred. Please try again.');
            }
        })
        .catch(err => {
            console.error(err);
            alert('An error occurred. Please try again.');
        });
    }
}