const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const directoryPath = './src/react-clearance-secrets/origin';
const outputPath = './src/react-clearance-secrets';
let fileMappings = [];

// 从文件名中获取序号
const extractOrderNumber = (filename) => {
  const match = filename.match(/^\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

// 创建一个uuid用作文件名以确保唯一性
const generateUniqueFileName = (existingNames) => {
  let uniqueName = '';
  do {
    uniqueName = uuidv4() + '.md';
  } while (existingNames.includes(uniqueName));
  return uniqueName;
};

// 遍历目录，并复制文件
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }
  
  const currentFiles = fs.readdirSync(outputPath).filter(file => file.endsWith('.md'));
  
  files.forEach((file) => {
    if (path.extname(file).toLowerCase() === '.md') {
      const newFileName = generateUniqueFileName(currentFiles);
      const originalFilePath = path.join(directoryPath, file);
      const newFilePath = path.join(outputPath, newFileName);
      fs.copyFileSync(originalFilePath, newFilePath);
      fileMappings.push({ originalName: file, newName: newFileName });
      currentFiles.push(newFileName);  // 添加到当前文件列表防止名称冲突
    }
  });

    // 根据序号对fileMappings进行排序
    fileMappings.sort((a, b) => {
      const orderA = extractOrderNumber(a.originalName);
      const orderB = extractOrderNumber(b.originalName);
      return orderA - orderB;
    });
  // 保存文件名映射到data.json
  fs.writeFileSync('data.json', JSON.stringify(fileMappings, null, 2), 'utf8');
  console.log('All files have been copied and mapped.');
});