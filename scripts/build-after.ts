import fs from 'fs-extra'
import path from 'path'

async function updatePackageFields() {
  try {
    const rootPackage = await fs.readJson('package.json')
    const publishPackagePath = 'publish/package.json'
    const publishPackage = await fs.readJson(publishPackagePath)

    // 指定要更新的字段
    const fieldsToUpdate = [
      'version',
      'name',        // 更新名称
      'description', // 更新描述
      'author',      // 更新作者
      'license'      // 更新许可证
    ]

    // 只更新指定的字段
    fieldsToUpdate.forEach(field => {
      if (rootPackage[field]) {
        publishPackage[field] = rootPackage[field]
        console.log(`  ✅ 更新 ${field}: ${rootPackage[field]}`)
      }
    })

    await fs.writeJson(publishPackagePath, publishPackage, { spaces: 2 })
    console.log('✨ 指定字段更新完成！')

  } catch (error) {
    console.error('更新失败:', error)
  }
}

updatePackageFields()