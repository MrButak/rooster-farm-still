<template>

<div class="flex flex-col w-full align-center">
    <h6 class="va-h6">Shipping Details</h6>
    <form class="flex flex-col w-full p-4 max-w-2xl" action="" method="" autocomplete="on">

        <div class="flex w-full flex-wrap gap-6 custom-size-no-gap">
            <div class="flex flex-col">
                <p>Name for order <span class="va-text-danger">*</span></p>
                <va-input
                    class="mb-4 w-full"
                    v-model="orderStore.userShippingData.nameField"
                    :rules="[(v) => v.length > 0 || `Can not be empty`]"
                    placeholder="name"
                    bordered
                />
            </div>
            <div class="flex flex-col">
                <p>Email <span class="va-text-danger">*</span></p>
                <va-input
                    class="mb-4 w-full"
                    v-model="orderStore.userShippingData.emailField"
                    :rules="[(v) => emailRegex.test(v) || `Must be valid email`]"
                    placeholder="email"
                    bordered
                />
            </div>
        </div>
        <p>Street address <span class="va-text-danger">*</span></p>
        <va-input
            class="pac-target-input mb-4"
            ref="addressField1"
            v-model="orderStore.userShippingData.addressField1"
            placeholder="street address"
            bordered
        /> 
        <p>Apartment, unit, suite, or floor #</p>
        <va-input
            class="mb-4"
            v-model="orderStore.userShippingData.addressField2"
            :rules="[]"
            bordered
        />

        <div class="flex w-full flex-wrap gap-6 custom-size-no-gap">
            <div class="flex flex-col">
                <p>City <span class="va-text-danger">*</span></p>
                <va-input
                    class="mb-4 w-full"
                    v-model="orderStore.userShippingData.cityField"
                    :rules="[(v) => v.length > 0 || `Can not be empty`]"
                    placeholder="city"
                    bordered
                />
            </div>
            <div class="flex flex-col">
                <p>State/Province <span class="va-text-danger">*</span></p>
                <va-input
                    class="mb-4 w-full"
                    v-model="orderStore.userShippingData.regionField"
                    :rules="[(v) => v.length > 0 || `Can not be empty`]"
                    placeholder="state/province"
                    bordered
                />
            </div>
        </div>

        <div class="flex w-full flex-wrap gap-6 custom-size-no-gap">
            <div class="flex flex-col">
                <p>Postal code <span class="va-text-danger">*</span></p>
                <va-input
                    class="mb-4 w-full"
                    v-model="orderStore.userShippingData.postalField"
                    :rules="[(v) => postalCodeRegex.test(v) || `Must be valid postal code`]"
                    placeholder="postal code"
                    bordered
                />
            </div>
            <div class="flex flex-col">
                <p>Country <span class="va-text-danger">*</span></p>
                <va-input
                    class="mb-4 w-full"
                    v-model="orderStore.userShippingData.countryField"
                    :rules="[(v) => v.length > 0 || `Can not be blank`]"
                    placeholder="postal code"
                    bordered
                />
            </div>
        </div>

        <p>Additional notes</p>
        <va-input
            class="mb-4"
            type="textarea"
            v-model="orderStore.userShippingData.additionalNote"
            :rules="[]"
            placeholder="additional notes"
            bordered
        />
    </form>
</div>

</template>

<script setup>

import { onMounted } from 'vue';
import { useOrderStore, useUiStore } from '../../services/stateStore';
import { emailRegex, postalCodeRegex } from '~~/services/validationManager';

// Pinia store
const orderStore = useOrderStore();
const uiStore = useUiStore();

const router = useRouter();

let autocomplete = {};
let addressField1 = ref(null);

onMounted(() => {
    // If user refreshes page, the Google Places script is no longer in <head>, and they can not use the Google Places Autofill for their address. This fix is checking to see if the script has been loaded yet - if not go back to the start of the checkout process.
    if(!uiStore.thirdPartyScriptsLoaded) { router.push('/shopping-cart') }
    else { initAutocomplete() };
});
    
function initAutocomplete() {
    // Create the autocomplete object
    autocomplete = new google.maps.places.Autocomplete(addressField1.value.input, {
        componentRestrictions: { country: ['us', 'ca'] },
        fields: ['address_components', 'geometry'],
        types: ['address']
    });
    autocomplete.addListener('place_changed', fillInAddress);
    
    //this.addressField1.focus();
    // When the user selects an address from the drop-down, populate the address fields in the form.
};

function fillInAddress() {
    
    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace();
    let address1 = '';
    let postcode = '';
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // which are documented at http://goo.gle/3l5i5Mr
    for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {

            case 'street_number': {
                address1 = `${component.long_name} ${address1}`;
                break;
            }
            case 'route': {
                address1 += component.short_name;
                break;
            }
            case 'postal_code': {
                postcode = `${component.long_name}${postcode}`;
                break;
            }
            case 'postal_code_suffix': {
                postcode = `${postcode}-${component.long_name}`;
                break;
            }
            case 'locality':
                orderStore.userShippingData.cityField = component.long_name;
                break;
            case 'administrative_area_level_1': {
                orderStore.userShippingData.regionField = component.short_name;
                break;
            }
            case 'country':
                orderStore.userShippingData.countryField = component.long_name;
                break;
        };
    };
    orderStore.userShippingData.addressField1 = address1;
    orderStore.userShippingData.postalField = postcode;

    // After filling the form with address components from the Autocomplete
    // prediction, set cursor focus on the second address line to encourage
    // entry of subpremise information such as apartment, unit, or floor number.
    // addressField2.focus();
};


</script>

<style lang="scss" scoped>

.required-marker {
    color: red;
}
.address-form-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
}
#address-form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    max-width: 45rem;
    padding: 10px 20px 20px 10px;
}
.AddressFormTitle {
    text-align: left;
    font-weight: 800;
    width: 100%;
    
}
.full-field {
    flex: 400px;
    margin: 15px 0;
}
.form-label {
    width: 100%;
    padding: 0.5em;
    font-size: large;
}
.pac-target-input:not(:-webkit-autofill) {
    animation-name: endBrowserAutofill;
}
.pac-item {
  font-size:35px;
}
.pac-item-query {
  font-size:35px;
}
input {
    width: 100%;
    height: 2.6rem;
    margin-top: 0;
    padding: 0.5em;
    border: 0;
    border-bottom: 1px solid #ccbdae;
}
.slim-field-left {
    flex: 1 150px;
    margin: 15px 15px 15px 0px;
}
.slim-field-right {
    flex: 1 150px;
    margin: 15px 0px 15px 15px;
}

input[type="reset"] {
    width: auto;
    height: auto;
    border-bottom: 0;
    background-color: transparent;
    color: #686868;
   /* font-size: 14px; */
}
/*Custom break point for the form. Should not have gap:*------------------------------------------------------*/
@media (max-width: 555px) {
    .custom-size-no-gap {
        gap: 0;    
    }
}

</style>
