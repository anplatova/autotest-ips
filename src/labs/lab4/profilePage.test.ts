import { LoginPage } from "../../page-object/Login.page"
import { ProfilePage } from "../../page-object/Profile.page"
import { UserPage } from "../../page-object/User.page"
import { auth } from "../../secrets/passwords"
import { getRandomString } from "../lab1/task8"


describe('Public profile test', async () => {
    let loginPage: LoginPage
    let userPage: UserPage
    let profilePage: ProfilePage
    const filePath: string = 'src/data/picture_png.png'
    const secondFilePath: string = 'src/data/picture2.png'
    const wrongFilePath: string = 'src/data/not_picture.txt'

    before(async () => {
        loginPage = new LoginPage(browser)
        profilePage = new ProfilePage(browser)
        userPage = new UserPage(browser)
        await loginPage.open()
        await loginPage.login(auth)
    })

    beforeEach(async () => {
        await profilePage.open()
    })

    it('Редактирование поля Name', async () => {
        const nameText: string = `name ${getRandomString(3)}`

        await profilePage.fillFieldName(nameText)
        await profilePage.saveChanges()

        await userPage.open()

        const displaydName: string = await userPage.getNameText()
        expect(displaydName).toEqual(nameText)
    })

    it('Редактирование поля Bio', async () => {
        const bioText: string = `test test ${getRandomString(10)}`

        await profilePage.fillFieldBio(bioText)
        await profilePage.saveChanges()

        await userPage.open()

        const displaydBio: string = await userPage.getBioText()
        expect(displaydBio).toEqual(bioText)
    })

    it('Отображение email на странице профиля', async () => {
        await profilePage.clickEmailSelect()
        await profilePage.clickEmailSelectValue()
        await profilePage.saveChanges()

        await userPage.open()

        const displaydEmail: string = await userPage.getEmailText()
        expect(displaydEmail).toEqual(auth.email)
    })

    it('Отображение местоимения Pronouns', async () => {
        await profilePage.clickPronounsSelect()
        await profilePage.clickPronounsSelectValue()
        await profilePage.saveChanges()

        await userPage.open()

        const displaydPronouns: string = await userPage.getPronounsText()
        expect(displaydPronouns).toEqual('she/her')
    })

    it('Загрузка аватара поддерживаемого типа', async () => {
        await profilePage.uploadFile(filePath)
        await profilePage.getButtonSaveAvatar()

        const alertGoodFile: string = await profilePage.getAlertGoodFileText()
        expect(alertGoodFile).toEqual('Your profile picture has been updated. It may take a few minutes to update across the site.')
    })

    // it('Загрузка аватара поддерживаемого типа, вариант 2', async () => {
    //     await profilePage.uploadFile(filePath)
    //     await profilePage.getButtonSaveAvatar()
    //     const oldAvatarPath: string = await profilePage.saveAvatarImagePath()
    //     await profilePage.uploadFile(secondFilePath)
    //     await profilePage.getButtonSaveAvatar()
    //     const newAvatarPathesIsEqual: Boolean = oldAvatarPath === await profilePage.saveAvatarImagePath()

    //     expect(newAvatarPathesIsEqual).toEqual(false)
    // })

    it('Ошибка при загрузке аватара неподдерживаемого типа', async () => {
        await profilePage.uploadFile(wrongFilePath)

        const alertBadFile: string = await profilePage.getAlertBadFileText()
        expect(alertBadFile).toEqual('We only support PNG, GIF, or JPG pictures.')
    })
})