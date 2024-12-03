import path from 'path'

const IMAGE_PATH: string = path.join(__dirname, './files/picture_png.png')
const PATH_INVALID_FILE: string = path.join(__dirname, './files/sql_file.sql')
const IMAGE_50x50_PATH: string = path.join(__dirname, './files/picture_50x50_png.png')
const IMAGE_1920x1080_PATH: string = path.join(__dirname, './files/picture_1920x1080.jpg')

export {
    IMAGE_PATH,
    IMAGE_50x50_PATH,
    IMAGE_1920x1080_PATH,
    PATH_INVALID_FILE,
}