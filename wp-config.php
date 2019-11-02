<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'wp' );

/** MySQL database password */
define( 'DB_PASSWORD', 'qwerasdf' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '0C<4DmOf8 yOr2s8M]M<yacXH2<PH9|o9Vxf3-.UN7|&(94m%dZz6X46r.2;;F)Y' );
define( 'SECURE_AUTH_KEY',  'W[POQhphTSH[$S{nPbeL:CAA@t(Bpb?#nu_A&G{YXE>; I8-.Vrz&F,<KUTq^/GZ' );
define( 'LOGGED_IN_KEY',    'bH;|t2e(icZ2^lTsntnRae:9O(Qrr0t<9$J]%q{X]Ij#7,|NQpvq9+c8HVPscUfc' );
define( 'NONCE_KEY',        '!B1IO(M,DEuewrfWy:0n236QO?8bC4lWC7X#hQ)uXPgkGT`(%S0Etp<$cGj]?d5+' );
define( 'AUTH_SALT',        'M!)6nJOf~z[}0v=eBEt1,.(zo%&5GjH`&9,J5B?2!`EIa0YR[yYSA1g8q{aG{i,3' );
define( 'SECURE_AUTH_SALT', 'Z]%Md|A}|F+d*]Vg<yS>*DlPCxltAveM]B<0/0D)CQoTpDP`l1MvJUTOI_KMPS{G' );
define( 'LOGGED_IN_SALT',   '=*||yA3tvK%Q,F@XwVG2`^Aidz!BFj{;!+bKHK.kr)lS1_hkkVhk-2PjX;X^W;]k' );
define( 'NONCE_SALT',       '0N@u:Yb67tf,4l31UfE<C,Lv4,0H+m]v9g:Jsh4%z?u}j;2n_ng yDMP0|kFNW9k' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
