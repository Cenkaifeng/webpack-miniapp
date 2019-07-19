/**
 * com-test-two
 * Created by undefined
 * 2019-07-18
 * @prop ...
 */
Component({
    properties: {},
    data: {},
    attached: function() {
        console.log('com-test-two on');
    },
    detached: function() {},
    methods: {
        testThree:function(){
            console.log("com-three on");
        }
    }
})