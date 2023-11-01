class StringValidator {
    constructor(inputString) {
        this.inputString = inputString;
        this.validationResults = { // 记录每个验证方法的状态
            containsLetter: false,
            containsDigit: false,
            // hasSpecificLength: true,
            containsChinese: false,
            containsSpace: false,
            containsPunctuation: false,
        };
    }
    // 验证字符串是否包含字母
    containsLetter() {
        const regex = /[a-zA-Z]/;
        this.validationResults.containsLetter = regex.test(this.inputString);
        return this;
    }
    // 验证字符串是否包含数字
    containsDigit() {
        const regex = /\d/;
        this.validationResults.containsDigit = regex.test(this.inputString);
        return this;
    }
    // 不提供长度验证，自行处理
    // hasSpecificLength(length) {
    //   this.validationResults.hasSpecificLength = this.inputString.length === length;
    //   return this;
    // }
    // 验证字符串是否包含汉字
    containsChinese() {
        const regex = /[\u4e00-\u9fa5]/;
        this.validationResults.containsChinese = regex.test(this.inputString);
        return this;
    }
    // 验证字符串是否包含空格
    containsSpace() {
        const regex = /\s/;
        this.validationResults.containsSpace = !regex.test(this.inputString);
        return this;
    }
    // 验证字符串是否包含标点符号
    containsPunctuation() {
        const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/; // 包含常见标点符号的正则表达式
        this.validationResults.containsPunctuation = regex.test(this.inputString);
        return this;
    }
    // 最终验证方法
    validate() {
        for (const key in this.validationResults) {
            if (!this.validationResults[key]) {
                return 'Not ' + key; // 返回第一个验证失败的方法名称
            }
        }
        return true; // 所有验证通过
    }
}

// 辅助函数，支持多条件的不完全验证（3个条件满足任意2个即可）
export function combineValidator(inputString, conditions, nums) {
    const validator = new StringValidator(inputString);
    const results = {};

    if (conditions.includes('containsLetter')) {
        results.containsLetter = validator.containsLetter();
    }

    if (conditions.includes('containsDigit')) {
        results.containsDigit = validator.containsDigit();
    }

    if (conditions.includes('containsPunctuation')) {
        results.containsPunctuation = validator.containsPunctuation();
    }

    if (conditions.includes('containsChinese')) {
        results.containsChinese = validator.containsChinese();
    }
    if (conditions.includes('containsSpace')) {
        results.containsSpace = validator.containsSpace();
    }




    // 计算满足条件的数量
    const satisfiedConditions = Object.entries(results).filter(([key, result]) => result.validationResults[key] == true)
    // 联合验证，支持多条件的不完全验证
    return {
        isValid: satisfiedConditions.length >= nums,
        satisfiedConditions,
    };
}

export {
    StringValidator,
};

// 测试示例
// const input1 = "Hello123";
// const input2 = "你好世界";
// const input3 = "12345";
// const input4 = "Contains Space ";
// const input5 = "NoSpacesHere";

// const result1 = new StringValidator(input1).containsLetter().containsDigit().validate();
// const result2 = new StringValidator(input2).containsLetter().containsDigit().validate();
// const result3 = new StringValidator(input3).containsLetter().containsDigit().validate();
// const result4 = new StringValidator(input4).containsLetter().containsDigit().validate();
// const result5 = new StringValidator(input5).containsLetter().containsDigit().validate();

// console.log(result1); // 输出 true
// console.log(result2); // 输出 "Not containsChinese"，因为包含汉字
// console.log(result3); // 输出 "Not containsLetter"，因为不包含字母
// console.log(result4); // 输出 "Not containsSpace"，因为包含空格
// console.log(result5); // 输出 "Not containsLetter"，因为不包含字母和数字

// 测试示例
// const input1 = "Hello123!";
// const input2 = "你好世界";
// const input3 = "123456";
// const input4 = "!@#";

// console.log(combineValidator(input1, ['containsLetter', 'containsDigit', 'containsPunctuation'], 2)); // 输出 true，包含字母和标点符号
// console.log(combineValidator(input2, ['containsLetter', 'containsDigit', 'containsPunctuation'], 2)); // 输出 false，不包含数字
// console.log(combineValidator(input3, ['containsLetter', 'containsDigit', 'containsPunctuation'], 2)); // 输出 false，不包含字母和标点符号
// console.log(combineValidator(input4, ['containsLetter', 'containsDigit', 'containsPunctuation'], 2)); // 输出 false，不满足至少两个条件