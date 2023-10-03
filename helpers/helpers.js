// dependencies 
import fs from 'fs';

// get data from json db 
export const getDataFromDB = (file) => {
    return JSON.parse(fs.readFileSync(file));
}

// add new data in json db 
export const addNewDataInDB = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

// delete data from db by id 
export const deleteDataByID = (file, id) => {
    // get all data from db 
    const allData = JSON.parse(fs.readFileSync(file));

    // new data without deleted item 
    const newData = allData.filter(item => item.id != id);

    // update database with new data 
    fs.writeFileSync(file, JSON.stringify(newData));
}

// generate uniq ids 
export const  generateRandomID = (length = 25) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    
    return result;
  }

// Generate slug 
export const generateSlug = (inputString) => {
    // Convert the string to lowercase and replace spaces with hyphens
    const slug = inputString.toLowerCase().replace(/\s+/g, '-');
  
    // Remove any characters that are not alphanumeric or hyphens
    const cleanSlug = slug.replace(/[^a-z0-9-]/g, '');
  
    // Remove consecutive hyphens
    const finalSlug = cleanSlug.replace(/-+/g, '-');
  
    return finalSlug;
  }