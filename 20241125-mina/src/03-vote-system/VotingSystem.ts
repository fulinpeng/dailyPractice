import { Field, SmartContract, state, State, method, Poseidon, Bool, Circuit, CircuitString, Provable, Struct } from 'o1js';

export class VotingSystem extends SmartContract {
    // 团队成员，不直接存储成员标识符，而是存储哈希值，保护成员隐私
    @state(Field) memberListHash = State<Field>();
    // 赞成票数量
    @state(Field) approveVotes = State<Field>();
    // 反对票数量
    @state(Field) rejectVotes = State<Field>();

    /**
     * 初始化投票系统
     * @param memberHashes 所有团队成员的标识符哈希值的哈希
     */
    @method async initVotingSystem(memberHashes: Field) {
        this.memberListHash.set(memberHashes); // 存储团队成员列表的哈希
        this.approveVotes.set(Field(0)); // 初始化赞成票数为 0
        this.rejectVotes.set(Field(0)); // 初始化反对票数为 0
    }

    /**
     * 成员投赞成票
     * @param memberHash 投票者的标识符哈希值
     */
    @method async approvalVote(memberList: Field[], memberHash: Field) {
        // 获取链上状态
        const memberListHash = this.memberListHash.get();
        const approveVotes = this.approveVotes.get();
        const rejectVotes = this.rejectVotes.get();

        // 确保链上状态未被篡改
        this.memberListHash.requireEquals(memberListHash);
        this.approveVotes.requireEquals(approveVotes);
        this.rejectVotes.requireEquals(rejectVotes);

        // 验证投票者是否是团队成员
        const validMember = memberList.some((e) => e.equals(memberHash).toBoolean());
        Bool(validMember).assertTrue("投票者不是团队成员");

        this.approveVotes.set(approveVotes.add(1)); // 增加赞成票

    }
    /**
     * 成员投反对票
     * @param memberHash 投票者的标识符哈希值
     */
    // @method async rejectedVote(memberHash: Field) {
    //     // 获取链上状态
    //     const memberListHash = this.memberListHash.get();
    //     const approveVotes = this.approveVotes.get();
    //     const rejectVotes = this.rejectVotes.get();

    //     // 确保链上状态未被篡改
    //     this.memberListHash.requireEquals(memberListHash);
    //     this.approveVotes.requireEquals(approveVotes);
    //     this.rejectVotes.requireEquals(rejectVotes);

    //     // 验证投票者是团队成员
    //     let isValidMember = false;
    //     for (const member of memberListHash) {
    //         if (member.equals(memberHash).toBoolean()) {
    //             isValidMember = true;
    //             break;
    //         }
    //     }
    //     Bool(isValidMember).assertTrue("Invalid member attempting to vote");

    //     // 验证投票者未投票
    //     const newVotedListHash = Poseidon.hash([votedListHash, memberHash]);
    //     votedListHash.assertNotEquals(newVotedListHash); // 确保哈希值不同(未重复投票)

    //     // 增加反对票
    //     this.rejectVotes.set(rejectVotes.add(1))

    //     // 更新已投票列表
    //     this.votedListHash.set(newVotedListHash);
    // }

}
