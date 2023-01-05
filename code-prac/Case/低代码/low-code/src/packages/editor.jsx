import { defineComponent } from "vue";
import './editor.scss';
export default defineComponent({
    setup(props) {
        console.log(props.data)

        return () => <div className="editor">
            <div className="editor-left">左侧物料区</div>
            <div className="editor-top">菜单栏</div>
            <div className="editor-right">属性控制栏目</div>
            <div className="editor-container">
                {/* 负责滚动条产生 */}
                <div className="editor-container-canvas">
                    {/* 产生内容区域 */}
                    <div className="editor-container-canvas__content">
                        内容区
                    </div>
                </div>
            </div>
        </div>
    },
    props: {
        data: { type: Object }
    }
})