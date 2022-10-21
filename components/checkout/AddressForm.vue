<template> 
    <form id="address-form" action="" method="" autocomplete="on">
        <p class="AddressFormTitle">Delivery Details</p>
        <p class="note"><em>* required field</em></p>
        <!-- Avoid the word "address" in id, name, or label text to avoid browser autofill from conflicting with Place Autocomplete. Star or comment bug https://crbug.com/587466 to request Chromium to honor autocomplete="off" attribute. -->
        <label class="full-field">
            <span class="form-label">Name for order*</span>
            <input ref="name" id="name" required="true" autocomplete="on" placeholder="Name">
        </label>
        <label class="full-field">
            <span class="form-label">Email* required for receipt</span>
            <input ref="email" type="email" id="email" required="" autocomplete="on" placeholder="Email">
        </label>
        <label class="full-field">
            <span class="form-label">Street address*</span>
            <input ref="addressField1" id="ship-address" name="ship-address" required="" autocomplete="off" class="pac-target-input" placeholder="Enter a location">
        </label>
        <label class="full-field">
            <span class="form-label">Apartment, unit, suite, or floor #</span>
            <input ref="addressField2" id="address2" name="address2">
        </label>
        <label class="full-field">
            <span class="form-label">City*</span>
            <input ref="locality" id="locality" name="locality" required="">
        </label>

        <div class="slim-field-wrapper">
            <label class="slim-field">
                <span class="form-label">State/Province*</span>
                <input ref="region" id="region" name="state" required="" >
            </label>
            <label class="slim-field" for="postal_code">
                <span class="form-label">Postal code*</span>
                <input ref="postalCode" id="postalcode" name="postcode" required="">
            </label>
        </div>

        
        <label class="full-field">
            <span class="form-label">Country*</span>
            <input ref="country" id="country" name="country" required="" >
        </label>
        <label class="full-field">
            <span class="form-label">Additional notes</span>
            <input ref="deliveryNote" id="deliveryNote" autocomplete="off" placeholder="additional notes" >
        </label>
        
        <p>{{ errorMessage }}</p>
        <!-- Reset button provided for development testing convenience.
    Not recommended for user-facing forms due to risk of mis-click when aiming for Submit button. -->
        <!--<input type="reset" value="Clear form">-->
    </form>
    
</template>



<script setup>
import { Loader } from '@googlemaps/js-api-loader';
const config = useRuntimeConfig();

// npm package to help load the google map object
const googleApiLoader = new Loader({
    apiKey: config.public.GOOGLE_MAPS_TOKEN,
    version: 'weekly',
    libraries: ['places']
});

let autocomplete = reactive({});
let errorMessage = ref('');


let name = ref('');
let email = ref('');
let addressField1 = ref('');
let addressField2 = ref('');
let postalCode = ref('');
let country = ref('');
let region = ref('');
let locality = ref('');
let deliveryNote = ref('');
// onMounted(() => initAutocomplete());
// This sample uses the Places Autocomplete widget to:
// 1. Help the user select a place
// 2. Retrieve the address components associated with that place
// 3. Populate the form fields with those address components.
// This sample requires the Places library, Maps JavaScript API.
// Include the libraries=places parameter when you first load the API.
// For example: 
//<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
// function initAutocomplete() {
    
    // Create the autocomplete object
    googleApiLoader
	.load()
    .then((google) => {

        autocomplete = new google.maps.places.Autocomplete(addressField1.value, {
            componentRestrictions: { country: ["us"] },
            fields: ["address_components", "geometry"],
            types: ["address"], 
        });

        // When the user selects an address from the drop-down, populate the address fields in the form.
        autocomplete.addListener("place_changed", fillInAddress());
        
    })
    nextTick(() => addressField1.value.focus())
// };

function fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace();
    
    let address1 = '';
    let postcode = '';
    
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // place.address_components are google.maps.GeocoderAddressComponent objects
    // which are documented at http://goo.gle/3l5i5Mr
    console.log(place)
    for (const component of place.address_components) {
        const componentType = component.types[0];
        switch (componentType) {
            case "street_number": {
                address1 = `${component.long_name} ${address1}`;
                break;
            }
            case "route": {
                address1 += component.short_name;
                break;
            }
            case "postal_code": {
                postcode = `${component.long_name}${postcode}`;
                break;
            }
            case "postal_code_suffix": {
                postalCode = `${postcode}-${component.long_name}`;
                break;
            }
            case "locality":
                customerDetails.locality = component.long_name;
                break;
            case "administrative_area_level_1": {
                customerDetails.state = component.short_name;
                break;
            }
            case "country":
                customerDetails.country = component.long_name;
                break;
        }
    }
    addressField1 = address1;
    postalField = postcode;
    // After filling the form with address components from the Autocomplete
    // prediction, set cursor focus on the second address line to encourage
    // entry of subpremise information such as apartment, unit, or floor number.
    customerDetails.addressField2.focus();
};

// async function validateAddress(event) {
//     event.preventDefault()
    
    
//     // validate address is local (salem, mo, usa). Will return a boolean value
//     let response = await axios({
//         method: 'post',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         url: `/menu/validatedeliveryaddress`,
//         data: {
//             email: this.email.value,
//             streetAddress: this.address1Field.value,
//             addressDetails: this.address2Field.value,
//             city: this.locality.value,
//             state: this.state.value,
//             postalCode: this.postalField.value,
//             country: this.country.value,
//             deliveryNote: this.deliveryNote.value
//         }
//     })
        
//     // if valid address
//     if(response.data) {
//         // assign customer details to global state object
//         this.customerDetails.user = {
//             name: customerDetails.name,
//             email: customerDetails.email,
//             add1Field: customerDetails.addressField1,
//             add2Field: customerDetails.addressField2,
//             posField: customerDetails.postalField,
//             countryField: customerDetails.country,
//             stateField: customerDetails.state,
//             cityField: customerDetails.locality,
//             deliveryNote: customerDetails.deliveryNote
//         }
//         // this.$router.push('Uservalidation');
//     }
    
//     else {
//         errorMessage.value = "Form Error. Please check that you have entered a valid email address and your delivery address is in Salem, MO.";
//         return;
//     };   
// }

</script>

<style lang="scss" scoped>
#address-form {
    display: flex;
    flex-direction: column;
    gap: .6rem;
    input {
        padding: .6rem .2rem;
        border: 1px solid black;
        font-size: large;
    }
    .full-field {
        display: flex;
        flex-direction: column;
    }
    .slim-field-wrapper {
        display: flex;
        input {
            display: flex;
            flex-direction: column;
            width: 50%;
        }
    }
}

// .pac-target-input:not(:-webkit-autofill) {
//     animation-name: endBrowserAutofill;
// }

</style>
