import { sequelize } from "../db/db"

const checkIfExists = async (name: string) => {
    const result = await sequelize.query(
        "SELECT DISTINCT group_id FROM documents"
    )
    const fileNames = result[0]
    if (!fileNames) {
        return false
    }
    return fileNames.map((item: any) => item.group_id).includes(name)
}
export default checkIfExists
