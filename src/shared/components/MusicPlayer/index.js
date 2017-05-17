/*
 * @Author: jinke.li 
 * @Date: 2017-05-12 13:54:56 
 * @Last Modified by: jinke.li
 * @Last Modified time: 2017-05-16 17:10:42
 */
import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import Modal from "shared/components/Modal"
import Button from "shared/components/Button"
import Message from "shared/components/Message"
import uploadAudio from "./action"

import "./styles.less"

@connect(
    ({ UploadAudioAction }) => ({
        audioUploadFile: UploadAudioAction.audioUploadFile
    }),
    (dispatch) => (
        bindActionCreators({
            uploadAudio
        }, dispatch)
    )
)
export default class MusicPlayer extends React.Component {
    state = {
        toggle: false,       //显示隐藏
        playing: false,      //是否播放
        duration: 0,          //音乐总时长
        currentTime: 0,        //当前音乐进度
        isLoop: false,         //是否循环
        isMute: false,          //是否静音
        soundValue: 100,
        isDown: false,      //鼠标是否按下  判断是否在拖动进度条
        uploadModalVisible: false,       //音乐上传框
        isCanUpload: false,        //是否能上传
        audioFileReady: false,
        audioImgReady: false,
        audioFile: {},
        audioImg: {}
    }
    IMG_MAX_SIZE = 1024
    static defaultProps = {
        mode: "mini",    //默认迷你模式
        isUploadAudio:false
    }
    static PropTypes = {
        mode: PropTypes.oneOf(['mini', 'full']),      //模式
        name: PropTypes.string,                       //音乐名
        imgSrc: PropTypes.string,                     //图片路径
        musicSrc: PropTypes.string.isRequired,        //音乐路径
        isUploadAudio:PropTypes.bool                    //是否上传音乐
    }
    constructor(props) {
        super(props)
        this.audio = null       //当前播放器
        this.defaultMusciName = "今日音乐"
        this.defaultMusciImgSrc = require('images/default.jpeg')
        this.mouseX = 0
    }
    render() {
        const {
            musicSrc,
            name,
            imgSrc,
            mode,
            className,
            audioUploadFile,
            isUploadAudio
        } = this.props

        const {
            toggle,
            playing,
            duration,
            audioImg,
            isCanUpload,
            currentTime,
            isLoop,
            isMute,
            soundValue,
            uploadModalVisible,
            audioFile,
            audioFileReady,
            audioImgReady
        } = this.state
        //当前播放进度
        const progress = ((currentTime / duration) * 100).toFixed(2)

        return (
            <figure className={classNames("music-player", className)} key="music-player">
                {/*控制按钮*/}
                {
                    toggle
                        ? undefined
                        : (
                            <div key="controller" className="scale music-player-controller" onClick={this.openPanel}>
                                <i className="icon icon-yinle"></i>
                                <div key="setting" className="music-player-controller-setting">{toggle ? "关闭" : "展开"}</div>
                            </div>
                        )
                }
                {/*播放器*/}
                {
                    toggle
                        ? (
                            <div key="panel" className="music-player-panel translate">
                                <section className="panel-content" key="panel-content">
                                    <div className={classNames("img-content",{"img-rotate":playing})} key="img-content">
                                        <img key="img" src={audioUploadFile && audioUploadFile.imageSrc || imgSrc || this.defaultMusciImgSrc} alt="" />
                                    </div>
                                    <div className="progressbar-content" key="progressbar-content">
                                        <span>{audioUploadFile && audioUploadFile.name || name || this.defaultMusciName}</span>
                                        <section>
                                            <span key="current-time" className="current-time">
                                                {/*暂时只考虑10分钟以下的歌曲*/}
                                                {
                                                    (~~currentTime) < 60
                                                        ? `00:${(~~currentTime) < 10 ? `0${~~currentTime}` : ~~currentTime}`
                                                        : `0${~~(currentTime / 60)}:${(~~(currentTime % 60) < 10) ? `0${~~(currentTime % 60)}` : ~~(currentTime % 60)}`
                                                }
                                            </span>
                                            <div className="progressbar" key="progressbar">
                                                <span key="progress" style={{ width: `${progress}%` }} className="progress">
                                                    <span
                                                        className="progress-change"
                                                        key="progress-change"
                                                        onMouseDown={this.onProgressDown}
                                                        onMouseUp={this.onProgressUp}
                                                        onMouseMove={this.onProgressMove}
                                                        onMouseOut={this.onProgressOut}
                                                    >
                                                    </span>
                                                </span>
                                            </div>
                                            <span key="duration" className="duration">
                                                {
                                                    (duration / 60) < 10
                                                        ? `0${(duration / 60).toFixed(2)}`
                                                        : `${(duration / 60).toFixed(2)}`
                                                }
                                            </span>
                                        </section>
                                    </div>
                                    <div className="player-content" key="player-content">
                                        {/*播放与暂停*/}
                                        <span className="play-btn" key="play-btn" onClick={this.onPlay}>
                                            {
                                                playing
                                                    ? <i className="icon icon-zanting"></i>
                                                    : <i className="icon icon-iconfont31"></i>
                                            }
                                        </span>
                                        {/*循环,重放等功能*/}
                                        <span className="play-setting" key="play-setting">
                                            <i key="icon-setting" className="icon icon-set"></i>
                                            <ul className="play-setting-items">
                                                <li className={classNames("item", { "active": isLoop })} key="setting1" onClick={this.audioLoop}>
                                                    <i className="icon icon-iconfontdanquxunhuan2eps" title="单曲循环"></i>
                                                </li>
                                                <li className="item reload-btn" key="setting2" onClick={this.audioReload}>
                                                    <i className="icon icon-shuaxin" title="重放"></i>
                                                </li>
                                            </ul>
                                        </span>
                                        {/*音量*/}
                                        <span className="play-sounds" key="play-sound">
                                            {
                                                isMute
                                                    ? <i key="icon-jingyin" className="icon icon-jingyin"></i>
                                                    : <i key="icon-17" className="icon icon-laba" onClick={this.onMute}></i>
                                            }
                                            <input type="range" value={soundValue} className="sound-operation" key="range" onChange={this.audioSoundChange} />
                                        </span>
                                        {
                                            mode === 'full'
                                                ? undefined
                                                : <span className="hide-panel" key="hide-panel-btn" onClick={this.onHidePanel}>
                                                    <i className="icon icon-11111" title="收起"></i>
                                                </span>
                                        }
                                        {
                                            uploadAudio
                                            ? <span className="upload-music" key="upload-music" onClick={this.showUploadModal}>
                                                <i className="icon icon-iconfontbiaozhunmoban01" title="上传你喜欢的音乐"></i>
                                              </span>
                                            : undefined
                                        }
                                    </div>
                                </section>
                            </div>
                        )
                        : undefined
                }
                <audio key="audio" className="music-player-audio" src={audioUploadFile && audioUploadFile.src || musicSrc} controls loop={isLoop}></audio>
                <Modal
                    title="上传你喜欢的音乐"
                    visible={uploadModalVisible}
                    onCancel={this.closeUploadModal}
                >
                    <form method="post" name="upload-music-form" encType="multipart/form-data" className="upload-music-form">
                        <div className="upload-music-content">
                            <p>
                                <input type="file" name="audioImg"  accept="image/*" ref="audioImg" className="hidden music-img-file-original-btn" onChange={this.selectAudioImgChange} />
                                {
                                    audioImgReady && audioImg && audioImg.src && audioImg.size
                                        ? (
                                            <div className="audio-img-show">
                                                {
                                                    <div style={{ "position": "relative" }}>
                                                        <img src={audioImg.src} className="audio-img" key="audio-img" />
                                                        <span key="audio-img-size" className="audio-img-size">{audioImg.size}</span>
                                                    </div>
                                                }
                                            </div>
                                        )
                                        : undefined
                                }
                                <Button type="block" htmlType="button" onClick={this.selectAudioImg}>选择图片</Button>
                            </p>
                            <p>
                                <input type="file" name="audioFile" ref="audioFile" className="hidden music-file-original-btn" onChange={this.selectAudioChange} />
                                {
                                    audioFileReady && audioFile && audioFile.name && audioFile.size
                                        ? <span>名字:{audioFile.name} || 大小:{audioFile.size}</span>
                                        : undefined
                                }
                                <Button type="block" htmlType="button" style={{ "marginTop": "10px" }} onClick={this.selectAudio} className="music-file-btn">选择音乐</Button>
                            </p>
                            <p>
                                {
                                    isUploadAudio
                                        ? <Button key="uploadBtn" type="primary block" htmlType="button" onClick={this.upLoadAudio} className="music-upload-file-btn">立即上传</Button>
                                        : <Button key="uploadBtn" type="error block" htmlType="button" className="music-upload-file-btn">立即上传</Button>
                                }

                            </p>
                        </div>
                    </form>
                </Modal>
            </figure>
        )
    }
    selectAudio = () => {
        const fileBtn = this.dom.querySelector('.music-file-original-btn')
        fileBtn.click()
    }
    selectAudioChange = () => {
        const files = Array.from(this.refs.audioFile.files)
        files.forEach((file) => {
            let { type, name, size } = file;
            if (!/.*\/mp3$/.test(type)) {
                return Message.error('请上传mp3文件')
            }
            this.setState({
                audioFileReady: true,
                audioFile: {
                    name,
                    size: ~~(size / 1024) > 1024 ? `${~~(size / 1024 / 1024)}MB` : `${~~(size / 1024)}KB`
                }
            })
        })

    }
    selectAudioImg = () => {
        const fileBtn = this.dom.querySelector('.music-img-file-original-btn')
        fileBtn.click()
    }
    selectAudioImgChange = () => {
        var _this = this
        const files = Array.from(this.refs.audioImg.files);
        files.forEach((file) => {
            let { type, name, size } = file;
            if (!/.*\/(jpg|jpeg|png)$/.test(type)) {
                return Message.error('无效的图片格式')
            }
            if (~~(size / 1024) >= this.IMG_MAX_SIZE) {
                let max = this.IMG_MAX_SIZE > 1024 ? `${this.IMG_MAX_SIZE}MB` : `${this.IMG_MAX_SIZE}KB`
                return Message.warning(`图片最大 ${max}`)
            }
            const reader = new FileReader();
            reader.onprogress = () => {
                console.debug(`${name}读取中,请稍后`);
            };
            reader.onabort = () => {
                this.setState({
                    audioImgReady: false,
                    audioImg: {}
                })
                console.debug(`${name}读取中断`)
            };
            reader.onerror = () => {
                this.setState({
                    audioImgReady: false,
                    audioImg: {}
                })
                Message.error(`${name}读取失败`)
                console.debug(`${name}读取失败!`)
            };
            reader.onload = function () {
                console.debug(`${name}读取成功,文件大小：${size / 1024}KB`)
                const result = this.result;        //读取失败时  null   否则就是读取的结果
                _this.setState({
                    audioImgReady: true,
                    audioImg: {
                        src: result,
                        size: `${(~~size / 1024)}KB`
                    }
                })
            }
            reader.readAsDataURL(file);      //base64
        })
    }
    upLoadAudio = () => {
        const formEle = this.dom.querySelector('.upload-music-form')
        const formData = new FormData(formEle)
        this.props.uploadAudio(formData)
    }
    showUploadModal = () => {
        this.setState({ uploadModalVisible: true })
    }
    closeUploadModal = () => {
        this.setState({ uploadModalVisible: false })
    }
    stopAll = (target) => {
        target.stopPropagation()
        target.preventDefault()
    }
    getBoundingClientRect = () => {
        const ele = this.dom.querySelector('.progress')
        const { left } = ele.getBoundingClientRect()
        return {
            left
        }
    }
    progressClick = (e) => {
        this.stopAll(e)
        const { left } = this.getBoundingClientRect()
        this.audio.currentTime = ~~(e.pageX - left)
    }
    onProgressDown = (e) => {
        this.stopAll(e)
        this.setState({ isDown: true })
        const { left } = this.getBoundingClientRect()
        this.mouseX = (e.pageX - left) >> 0
    }
    onProgressUp = (e) => {
        this.stopAll(e)
        this.setState({ isDown: false })
    }
    onProgressMove = (e) => {
        this.stopAll(e)
        const { isDown } = this.state
        let moveX = 0
        const { left } = this.getBoundingClientRect()
        if (isDown === true) {
            moveX = (e.pageX - left - this.mouseX) >> 0
            this.audio.currentTime += moveX
        }
    }
    onProgressOut = (e) => {
        this.stopAll(e)
        this.setState({ isDown: false })
    }
    //循环播放
    audioLoop = () => {
        this.setState({ isLoop: true })
        this.audio.loop = true
    }
    //重新播放
    audioReload = () => {
        this.audio.load()
        this.onPlay()
    }
    openPanel = () => {
        this.setState({ toggle: !this.state.toggle })
    }
    //收起播放器
    onHidePanel = () => {
        this.openPanel()
    }
    //播放
    onPlay = () => {
        //是否在播放
        const { playing } = this.state
        if (playing === true) {
            this.pauseAudio()
        } else {
            this.getAudioLength();
            this.loadAudio();
        }
    }
    //暂停
    pauseAudio = () => {
        this.audio.pause()
        this.setState({ playing: false })
    }
    //加载音频
    loadAudio = () => {
        if (this.audio.readyState == 4 && this.audio.networkState != 3) {
            this.setState({ playing: true })
            this.audio.play()
        }
    }
    //获取音频长度
    getAudioLength = () => {
        this.setState({
            duration: this.audio.duration - 11
        })
    }
    loadAudioError = () => {
        this.setState({ playing: false })
        Message.error('加载音频失败,请刷新重试',undefined,()=>this.onPlay())
    }
    //音频播放结束
    audioEnd = () => {
        this.setState({ playing: false })
    }
    //播放进度更新
    audioTimeUpdate = () => {
        const currentTime = this.audio.currentTime
        this.setState({
            currentTime
        })
    }
    //音量控制
    audioSoundChange = (e) => {
        const value = e.target.value
        this.audio.volume = value / 100
        this.setState({
            soundValue: value
        })
    }
    //音量改变
    audioVolumeChange = () => {
        if (this.audio.volume <= 0) {
            this.setState({
                isMute: true
            })
        } else {
            this.setState({
                isMute: false
            })
        }
    }
    //静音
    onMute = () => {
        this.setState({
            isMute: true,
            soundValue: 0
        })
        this.audio.volume = 0
    }
    toggleMode = (mode) => {
        if (mode === "full") {
            this.setState({ toggle: true })
        }
    }
    componentDidMount() {
        this.dom = ReactDOM.findDOMNode(this)
        this.progress = this.dom.querySelector('.progress')
        this.audio = this.dom.querySelector('audio')
        this.audio.addEventListener('waiting', this.loadAudio)
        this.audio.addEventListener('canplay', this.onPlay)
        this.audio.addEventListener('error', this.loadAudioError)
        this.audio.addEventListener('ended', this.audioEnd)
        this.audio.addEventListener('timeupdate', this.audioTimeUpdate)
        this.audio.addEventListener('volumechange', this.audioVolumeChange)
        this.toggleMode(this.props.mode)
    }
}