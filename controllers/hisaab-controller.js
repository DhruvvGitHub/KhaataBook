const { isLoggedIn } = require('../middlewares/isLoggedIn')
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

module.exports.viewHisaabController = async (req, res) => {
    const id = req.params.id

    const hisaab = await hisaabModel.findOne({ _id: id })

    const error = req.flash("error")
    if (hisaab.encrypted) {
        res.render("passcode", { isLoggedIn: true, hisaab, error })
    }

    return res.render("viewHisaab", { isLoggedIn: true, hisaab ,error })
}

module.exports.viewPasscodeHisaab = async (req, res) => {
    const id = req.params.id

    const hisaab = await hisaabModel.findOne({
        _id: id
    })

    if(hisaab.passcode !== req.body.passcode) {
        req.flash("error", "Wrong passcode entered")
        return res.redirect(`/hisaab/view/${id}`);
    } else {
        return res.render("viewHisaab", { isLoggedIn: true, hisaab })
    }
}

module.exports.editHisaabPageController = async (req, res) => {
    const id = req.params.id

    const hisaab = await hisaabModel.findOne({ _id: id })

    res.render("editHisaab", {isLoggedIn: true, hisaab})
}

module.exports.editHisaabController = async (req, res) => {
    const id = req.params.id

    const hisaab = await hisaabModel.findOne({
        _id: id
    })

    if(!hisaab) {
        return res.redirect("/profile")
    }

    hisaab.title = req.body.title
    hisaab.description = req.body.description
    hisaab.encrypted = req.body.encrypted == 'on' ? true : false;
    hisaab.passcode = req.body.passcode
    hisaab.editable = req.body.editPermissions == 'on' ? true : false;
    hisaab.shareable = req.body.shareable == 'on' ? true : false;

    await hisaab.save();

    return res.redirect("/profile")
}


module.exports.deleteHisaabController = async (req, res) => {
    const id = req.params.id

    const hisaab = hisaabModel.findOne({ 
        _id: id,
        user: req.user.id
     })

     if(!hisaab) {
        return res.redirect("/profile")
     }

     await hisaabModel.deleteOne({ _id: id })
     return res.redirect("/profile")
}