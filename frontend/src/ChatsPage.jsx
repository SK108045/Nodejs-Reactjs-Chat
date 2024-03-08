import { MultiChatSocket, MultiChatWindow, useMultiChatLogic} from 'react-chat-engine-advanced'
const ChatsPage = (props) => {
    const chatProps = useMultiChatLogic(
    '81928dec-983c-457c-8ec2-8f0b95baae40',
    
    props.user.username, 
    props.user.secret
    );
    return <div style = {{height: '100vh'}}>
        <MultiChatSocket {...chatProps}/>
        <MultiChatWindow  {...chatProps} style={{ height: '100%' }}/>    
    </div>
}
export default ChatsPage