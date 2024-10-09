
const autorizeRole = ( ...roles ) => {

    return ( req, res, next ) => {
        if ( !roles.includes(req.user.role)) {
            return res.status(403).json({
                ok: false,
                message: 'Access denied'
            })
        }

        next()
    }
}

module.exports = autorizeRole;