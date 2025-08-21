// JavaScript Example: Reading Entities  
// Filterable fields: product\_id, marketplace, marketplace\_id, status, listing\_price, listing\_title, listing\_description, views, watchers, listed\_date, end\_date, auto\_relist  
async function fetchListingEntities() {  
    const response \= await fetch(\`https://app.base44.com/api/apps/688afcf95a535475ff04a23e/entities/Listing\`, {  
        headers: {  
            'api\_key': '53ebd5ac5fed465da72f120dbce0517c', // or use await User.me() to get the API key  
            'Content-Type': 'application/json'  
        }  
    });  
    const data \= await response.json();  
    console.log(data);  
}

// JavaScript Example: Updating an Entity  
// Filterable fields: product\_id, marketplace, marketplace\_id, status, listing\_price, listing\_title, listing\_description, views, watchers, listed\_date, end\_date, auto\_relist  
async function updateListingEntity(entityId, updateData) {  
    const response \= await fetch(\`https://app.base44.com/api/apps/688afcf95a535475ff04a23e/entities/Listing/${entityId}\`, {  
        method: 'PUT',  
        headers: {  
            'api\_key': '53ebd5ac5fed465da72f120dbce0517c', // or use await User.me() to get the API key  
            'Content-Type': 'application/json'  
        },  
        body: JSON.stringify(updateData)  
    });  
    const data \= await response.json();  
    console.log(data);  
}  
