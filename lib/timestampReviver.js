// timestampReviver ::
// ( String, String ) -> String
// e.g. ( key, value ) => ( key === 'x' ? transform(value) : value )

export default ( key, value ) => ( key === 'timestamp' ? new Date( Date.parse( value ) ) : value )