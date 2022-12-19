import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import { Edit, Save } from './edit';



registerBlockType( 'extended-checkout/radio-options', {
	edit: Edit,

	save: Save,
} );
