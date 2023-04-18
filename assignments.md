# Day 1: Date: 17-April-2023
1. Modify the SelectCompoent for using Context to received data from its parent as well as implementing the Callback to emit data to parent

2. Complete the DataGridContextComponent based on the following needs
    - Pass the CanDelete property from parent of the type boolean
        - If the value is 'true', for each record in table show the delete button
        - Once this button is clicked, the record fro the collection received from parent must be deleted
    - When the column header for each coloumn in DataGrid is clicked  sort the data in DataGird based on the values in that column for the second click rebverse it     

# Day 2: Date: 18-April-2023
1. Add new Actions for Update and Delete product records as follows
    -  the DataGrid has the Delete button, once this is clicked, the perent compoenent will dispatch an action to delete the record by making an API call, once this call is successful, the deleteSuccessReducer should splice this record from store so tha the DataGridComponent will show the remaining data
    - When a table row is clicked, the product data must be retrived from store based on ProductId and then this selected product details mustb be displayed in createproductcomponent (complete it by adding required UI), then in the 'Save' button, dispatch an action for updating the products and upon success update the old prodicr record from store to newly updated values and show this new data in DataGrid
    - Add required Actions, reducers, and Sagas   