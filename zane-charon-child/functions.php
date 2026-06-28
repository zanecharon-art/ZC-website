<?php
/**
 * Zane Charon Child Theme – Funktionen
 */

add_action( 'wp_enqueue_scripts', function () {
	$parent_style = 'astra-style'; // Theme-Handle des Eltern-Themes; bei Kadence ggf. anpassen.

	wp_enqueue_style(
		'zane-charon-google-fonts',
		'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap',
		array(),
		null
	);

	wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );

	wp_enqueue_style(
		'zane-charon-custom',
		get_stylesheet_directory_uri() . '/zane-charon-custom.css',
		array( $parent_style ),
		wp_get_theme()->get( 'Version' )
	);
} );
