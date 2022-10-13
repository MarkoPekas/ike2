import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            id: context.params?.id
        }
    }
}

const Post = (props: any) => {
    console.log(props)
    return (
        <div>

        </div>
    )
}

export default Post