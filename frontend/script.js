function showChat() {
	$( document.body ).css( 'background-image' , 'none' );
	$( '#home' ).removeClass( 'active' );
	$( '#home' ).css( 'display' , 'transparent' );
	$( '#chat' ).addClass( 'active' );
}