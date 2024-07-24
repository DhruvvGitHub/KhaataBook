const hisaabModel = require('../models/hisaab-model')

module.exports.createPageController = async (req, res) => {
    const error = req.flash("error")
    res.render("createHisaab", { error })
}

module.exports.createHisaabController = async (req, res) => {
    const { title, description, passcode} = req.body

    if(!title || !description) {
        req.flash("error", "Title and description are required")
        return res.redirect("/hisaab/create")
    }

    const isEncrypted = req.body.encrypted == 'on' ? true : false
    const isShareable = req.body.shareable == 'on' ? true : false
    const editPermissions = req.body.editPermissions == 'on' ? true : false

    const hisaab = new hisaabModel({
        user: req.user.id,
        title,
        description,
        encrypted: isEncrypted,
        passcode,
        shareable: isShareable,
        editable: editPermissions
    })

    await hisaab.save()
    return res.redirect("/profile")
}