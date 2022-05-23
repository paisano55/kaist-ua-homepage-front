import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { init, setPost, changeField } from "../../../modules/post";
import { setBoards, setCurrentBoard } from "../../../modules/boards";
import { EditorContent } from "../../templates";
import { withRouter } from "react-router-dom";
import * as postsAPI from "../../../lib/api/post";
import * as boardsAPI from "../../../lib/api/board";
import * as introAPI from "../../../lib/api/intro"

const IntroEditorContentContainer = ({ history, mainId, subId }) => {
    const dispatch = useDispatch();
    const post = useSelector(({ post }) => post);



    const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
        dispatch
    ]);

    const onCancel = () => {
        history.goBack();
    };

    const onWrite = () => {
        console.log(post);
        postsAPI
            .write(post)
            .then(res => {
                history.push(`/web/board/${boardId}`);
            })
            .catch(err => console.log(err));
    };

    const onEdit = () => {
        postsAPI
            .update(postId, post)
            .then(res => {
                history.push(`/web/post/${postId}`);
            })
            .catch(err => console.log(err));
    };



    useEffect(() => {
        if (boardId) {
            dispatch(changeField({ key: "boardId", value: boardId }));
        }
    }, [dispatch, boardId]);

    useEffect(() => {
        if (boardId) {
            boardsAPI
                .list()
                .then(res => {
                    const boards = res.data;
                    dispatch(setBoards(boards));
                    boards.forEach(board => {
                        if (board.id === parseInt(boardId)) {
                            dispatch(setCurrentBoard(board));
                        }
                    });
                })
                .catch(err => console.log(err));
        }
    }, [boardId, dispatch]);

    useEffect(() => {
        if (postId) {
            postsAPI
                .read(postId)
                .then(res => {
                    dispatch(setPost(res.data));
                })
                .catch(err => console.log(err));
        };
    }, [postId, dispatch]);


    useEffect(() => {
        return () => {
            dispatch(init());
        };
    }, [dispatch]);

    return (
        <EditorContent
            onChangeField={onChangeField}
            onWrite={postId ? onEdit : onWrite}
            onCancel={onCancel}
            initialContent={postId ? { korContent: post.korContent, engContent: post.engContent } : null}
        />
    );
};

export default withRouter(IntroEditorContentContainer);