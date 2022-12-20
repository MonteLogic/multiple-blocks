/**
 * External dependencies
 */
 import { useEffect, useState } from '@wordpress/element';
 import { CheckboxControl } from '@woocommerce/blocks-checkout';
 import { getSetting } from '@woocommerce/settings';
 import { useSelect, useDispatch } from '@wordpress/data';
 
 const { optinDefaultText } = getSetting( 'extended-checkout_data', '' );
 
 const Block = ( { children, checkoutExtensionData } ) => {
     const [ checked, setChecked ] = useState( false );
     const { setExtensionData } = checkoutExtensionData;
 
     const { setValidationErrors, clearValidationError } = useDispatch(
         'wc/store/validation'
     );
 
     useEffect( () => {
         setExtensionData( 'extended-checkout', 'optin', checked );
         if ( ! checked ) {
             setValidationErrors( {
                 'extended-checkout': {
                     message: 'Please tick the box',
                     hidden: false,
                 },
             } );
             return;
         }
         clearValidationError( 'extended-checkout' );
     }, [
         clearValidationError,
         setValidationErrors,
         checked,
         setExtensionData,
     ] );
 
     const { getValidationError } = useSelect( ( select ) => {
         const store = select( 'wc/store/validation' );
         return {
             getValidationError: store.getValidationError(),
         };
     } );
 
     const errorMessage = getValidationError( 'extended-checkout' )?.message;
 
     return (
         <>
             <CheckboxControl
                 id="subscribe-to-newsletter"
                 checked={ checked }
                 onChange={ setChecked }
             >
                 { children || optinDefaultText }
             </CheckboxControl>
 
             { errorMessage && (
                 <div>
                     <span role="img" aria-label="Warning emoji">
                         ⚠️
                     </span>
                     { errorMessage }
                 </div>
             ) }
         </>
     );
 };
 
 export default Block;