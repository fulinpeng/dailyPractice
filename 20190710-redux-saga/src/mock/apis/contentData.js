const Mock = require('mockjs');
const str = 'abcdefghijklmnoporstuvwxyz';
Mock.mock('contentData.do','post', (params) => {
    console.log('~~~~~~~~~~~~~~mockjs--post参数：', params);
    return Mock.mock({
        'contentData|1-10': [
            {
                'id|+1': Mock.mock('@increment'),
                'head': Mock.mock(`@image('100x100', ${Mock.mock('@color')}, 'mockjs')`),
                'name': Mock.mock(`@string(${str}, 3, 10)`),
                'tel': '+1.8082379636',
                'adress': `34245 Stratford Drive`,
                'country': Mock.mock('@cword(3, 5)'),
                'tags|1-2': [Mock.mock(`@string(${str}, 3, 10)`), Mock.mock(`@string(${str}, 3, 10)`)],
                'desc': Mock.mock('@paragraph(1, 3)'),
            },
        ]
    })
})

Mock.mock(RegExp('contentData.do.*'),'get', (params) => {
    console.log('~~~~~~~~~~~~~~mockjs--get参数：', params);
    return Mock.mock({
        'contentData|1-10': [
            {
                'id|+1': Mock.mock('@increment'),
                'head': Mock.mock(`@image('100x100', ${Mock.mock('@color')}, 'mockjs')`),
                'name': Mock.mock(`@string(${str}, 3, 10)`),
                'tel': '+1.8082379636',
                'adress': `34245 Stratford Drive`,
                'country': Mock.mock('@cword(3, 5)'),
                'tags|1-2': [Mock.mock(`@string(${str}, 3, 10)`), Mock.mock(`@string(${str}, 3, 10)`)],
                'desc': Mock.mock('@paragraph(1, 3)'),
            },
        ]
    })
})
