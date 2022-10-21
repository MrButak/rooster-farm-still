<template> 
    <!-- <Script :src="googlePlacesUrl"></Script> -->
    <form id="address-form" action="" method="" autocomplete="on"> <!-- may have to toggleback on -->
        <p class="AddressFormTitle">Delivery Address</p>
        <p class="note"><em>* = required field</em></p>
        <!-- Avoid the word "address" in id, name, or label text to avoid browser autofill from conflicting with Place Autocomplete. Star or comment bug https://crbug.com/587466 to request Chromium to honor autocomplete="off" attribute. -->
        <label class="full-field">
            <span class="form-label">Name for order*</span>
            <input v-model="inputFields.nameField" id="name" required="true" autocomplete="on" placeholder="Name">
        </label>
        <label class="full-field">
            <span class="form-label">Email*</span><span class="note">required for receipt</span>
            <input v-model="inputFields.emailField" type="email" id="email" required="" autocomplete="on" placeholder="Email">
        </label>
        <label class="full-field">
            <span class="form-label">Street address</span>
            <input ref="addressField1" v-model="inputFields.addressField1" id="ship-address" name="ship-address" required="" autocomplete="off" class="pac-target-input" placeholder="Enter a location">
        </label>
        <label class="full-field">
            <span class="form-label">Apartment, unit, suite, or floor #</span>
            <input v-model="inputFields.addressField2" id="address2" name="address2">
        </label>
        <label class="full-field">
            <span class="form-label">City*</span>
            <input v-model="inputFields.cityField" id="cityField" name="cityField" required="">
        </label>
        <label class="slim-field-left">
            <span class="form-label">State/Province*</span>
            <input v-model="inputFields.regionField" id="regionField" name="regionField" required="" >
        </label>
        <label class="slim-field-right" for="postal_code">
            <span class="form-label">Postal code*</span>
            <input v-model="inputFields.postalField" id="postcode" name="postcode" required="">
        </label>
        <label class="full-field">
            <span class="form-label">Country*</span>
            <input v-model="inputFields.countryField" id="countryField" name="countryField" required="" >
        </label>
        <label class="full-field">
            <span class="form-label">Additional notes</span>
            <input v-model="deliveryNote" id="deliveryNote" autocomplete="off" placeholder="additional notes" >
        </label>
        <div class="submitBtnWrapper">
            <button type="submit" class="my-button">Checkout</button>
        </div>
        <p>{{ errorMessage }}</p>
        <!-- Reset button provided for development testing convenience.
    Not recommended for user-facing forms due to risk of mis-click when aiming for Submit button. -->
        <!--<input type="reset" value="Clear form">-->
    </form>
    
</template>

<script setup>
import { Loader } from '@googlemaps/js-api-loader';

const config = useRuntimeConfig();

const googleMapLoader = new Loader({
    apiKey: config.public.GOOGLE_MAPS_API,
    version: 'weekly',
    libraries: ['places']
});

let autocomplete = {};
let inputFields = reactive({
    addressField1: '',
    addressField2: '',
    cityField: '',
    regionField: '',
    postalField: '',
    countryField: ''
})

let errorMessage = ref('');

let addressField1 = ref('');


let deliveryNote = ref('');

onMounted(() => initAutocomplete())
    
function initAutocomplete() {
    
    // Create the autocomplete object
    googleMapLoader
    .load()
    .then((google) => {
        autocomplete = new google.maps.places.Autocomplete(addressField1.value, {
            componentRestrictions: { country: ["us"] },
            fields: ["address_components", "geometry"],
            types: ["address"]
        });
        autocomplete.addListener("place_changed", fillInAddress);
    });

    //this.addressField1.focus();
    // When the user selects an address from the drop-down, populate the address fields in the form.
};

function fillInAddress() {
    // Get the place details from the autocomplete object.
    
    const place = autocomplete.getPlace();
    let address1 = "";
    let postcode = "";
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // place.address_components are google.maps.GeocoderAddressComponent objects
    // which are documented at http://goo.gle/3l5i5Mr
    for (const component of place.address_components) {
        console.log(component)
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
                postcode = `${postcode}-${component.long_name}`;
                break;
            }
            case "cityField":
            inputFields.cityField = component.long_name;
                break;
            case "administrative_area_level_1": {
                inputFields.regionField = component.short_name;
                break;
            }
            case "countryField":
                inputFields.countryField = component.long_name;
                break;
        }
    }
    inputFields.addressField1 = address1;
    inputFields.postalField = postcode;
    // After filling the form with address components from the Autocomplete
    // prediction, set cursor focus on the second address line to encourage
    // entry of subpremise information such as apartment, unit, or floor number.
    // addressField2.focus();
}


</script>

<style scoped>
#address-form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 400px;
    padding: 10px 20px 20px 10px;
}
.AddressFormTitle {
    text-align: left;
    font-weight: 800;
    width: 100%;
    
}
.note {
    width: 100%;
    margin-block-start: 0;
    font-size: 8px;
}
.full-field {
    flex: 400px;
    margin: 15px 0;
}
.form-label {
    width: 100%;
    padding: 0.5em;
}
.pac-target-input:not(:-webkit-autofill) {
    animation-name: endBrowserAutofill;
}
input {
    width: 100%;
    height: 2.0rem;
    margin-top: 0;
    padding: 0.5em;
    border: 0;
    border-bottom: 1px solid #ccbdae;
  /*  font-family: "Roboto", sans-serif; */
  /*  font-size: 18px; */
}
.slim-field-left {
    flex: 1 150px;
    margin: 15px 15px 15px 0px;
}
.slim-field-right {
    flex: 1 150px;
    margin: 15px 0px 15px 15px;
}
.submitBtnWrapper {
    display: flex;
}
.my-button {
    background-color: #1980b6;
    border-radius: 6px;
    color: #fff;
    padding: 6px 24px;
    text-decoration: none;
}
input[type="reset"] {
    width: auto;
    height: auto;
    border-bottom: 0;
    background-color: transparent;
    color: #686868;
   /* font-size: 14px; */
}
/*Tablet sizes*------------------------------------------------------*/
@media (min-width: 723px) {
 
}
/*Desktop sizes*-----------------------------------------------------*/
@media (min-width: 1023px) {
    #address-form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 45rem;
    padding: 10px 0 0 0;
}
}
</style>