import fs from 'fs-extra'
import path from 'path'

/**
 * 复制 README.md 文件到发布目录
 */
async function copyReadmeFile() {
  try {
    const sourceReadmePath = 'README.md'
    const targetReadmePath = 'publish/README.md'

    // 检查源文件是否存在
    if (await fs.pathExists(sourceReadmePath)) {
      await fs.copy(sourceReadmePath, targetReadmePath)
      console.log('  ✅ README.md 文件复制完成！')
    } else {
      console.warn('  ⚠️  源 README.md 文件不存在，跳过复制')
    }
  } catch (error) {
    console.error('复制 README.md 文件失败:', error)
  }
}

async function createPublishPackageJson() {
  try {
    const rootPackage = await fs.readJson('package.json')
    const publishPackagePath = 'publish/package.json'

    // 创建完整的 publishPackage 对象
    const publishPackage = {
      "name": "vue3-waterfall-next",
      "version": "1.1.3",
      "description": "Vue3 瀑布流组件",
      "keywords": [
        "vue3",
        "waterfall",
        "layout",
        "component"
      ],
      "private": false,
      "type": "module",
      "main": "./packages/index.js",
      "module": "./packages/index.mjs",
      "types": "./packages/index.d.ts",
      "files": [
        "packages/*"
      ],
      "repository": {
        "type": "git",
        "url": "git+https://github.com/TianKong-0512/vue3-waterfall-next.git"
      },
      "author": {
        "name": "GaoYi",
        "email": "1219164581@qq.com"
      },
      "dependencies": {
        "vue": "^3.5.27"
      },
      "devDependencies": {},
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    }


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
        publishPackage[field] = rootPackage[field] || publishPackage[field]
        console.log(`  ✅ 更新 ${field}: ${rootPackage[field]}`)
      }
    })

    // 确保 publish 目录存在
    await fs.ensureDir('publish')

    // 直接写入完整的 package.json 文件
    await fs.writeJson(publishPackagePath, publishPackage, { spaces: 2 })
    console.log('✨ package.json 文件创建完成！')
  } catch (error) {
    console.error('创建 package.json 文件失败:', error)
  }
}

/**
 * 主函数：执行构建后的所有处理任务
 */
async function main() {
  console.log('🚀 开始执行构建后处理...')

  // 1. 更新 package.json 字段
  await createPublishPackageJson()

  // 2. 复制 README.md 文件
  await copyReadmeFile()

  console.log('🎉 所有构建后处理任务完成！')
}

main()