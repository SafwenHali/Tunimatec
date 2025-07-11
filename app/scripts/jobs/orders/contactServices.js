const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

async function getAdressByID(id) {
  try {
    const response = await axios.get(process.env.GET_Adresses + '/' + id + process.env.TUNIMATEC_PRESTASHOP_WS_KEY);
    const Items = response.data;
    
    const parser = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(Items);

    const address = json?.prestashop?.address;
    
     if (!address) {
      return { status: 404, message: 'order not found' };
    }
   
   const result = {
        Adresse : address.address1,
        Téléphone : address.phone,
        Cité :address.city,
    } ;

    return result

  } catch (err) {
    return { status: 400, message: err.message };
  }
};

async function getCustomerByID(id) {
  try {
    const response = await axios.get(process.env.GET_Customers + '/' + id + process.env.TUNIMATEC_PRESTASHOP_WS_KEY);
    const Items = response.data;
    
    const parser = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(Items);

    const customer = json?.prestashop?.customer;
     if (!customer) {
      return { status: 404, message: 'order not found' };
    }

    const sexe = customer.id_gender == 1 ? "Homme" : "Femme";
   
   const result = {
        Nom:customer.lastname,
        Prénom:customer.firstname,
        Email:customer.email,
        Sexe:sexe
    } ;
    return result

  } catch (err) {
    return { status: 400, message: err.message };
  }
};

exports.sendConstact = async (clientID, adressID) => {
  try {
    const adress = await getAdressByID(adressID);
    const customer = await getCustomerByID(clientID);

    const contact = {
      request: {
        Nom: customer.Nom,
        Prénom: customer.Prénom,
        Email: customer.Email,
        Adresse: adress.Adresse,
        Téléphone: adress.Téléphone,
        Cité: adress.Cité,
        Sexe: customer.Sexe
      }
    };

    const response = await axios.post(process.env.ADD_Contact, contact);
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    //console.error('Error:', error.response?.status, error.response?.data || error.message);
    return null;
  }
};