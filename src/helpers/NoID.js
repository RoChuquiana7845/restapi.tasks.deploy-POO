export const NoID = (req, res) => { 
    res.status(404).json({ 
        message: 'Upps... I cannot see any id in your pararms'
    })
}

