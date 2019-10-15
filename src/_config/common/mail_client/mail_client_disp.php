<?php
return [
    'maxlength' => 2000,
    'action' => [
        /*
            id          ID
            name        メッセージ名()
            type        new,forward,return,cancel
            status      '1':完了
            mail_cc     mail_cc_infのcd_type
            subject     _configのテンプレートファイル
            message     _configのテンプレートファイル
            after       将来
        */
        '1' => [
            'id' => '1',
            'name' => '新規作成',
            'type' => 'new',
            'status' => '',
            'mail_cc' => '',
            'subject' => '',
            'message' => '',
            'after' => ''
        ],
        '2' => [
            'id' => '2',
            'name' => '転送',
            'type' => 'forward',
            'status' => '',
            'mail_cc' => '',
            'subject' => '',
            'message' => '',
            'after' => ''
        ],
        '3' => [
            'id' => '3',
            'name' => '返信',
            'type' => 'return',
            'status' => '',
            'mail_cc' => '',
            'subject' => '',
            'message' => '',
            'after' => ''
        ],
        
        //出荷申請
        '11' => [
            'id' => '11',
            'name' => '申請',
            'type' => 'new',
            'status' => '',
            'mail_cc' => '1',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\subject\\11.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\message\\11.php',
            'after' => ''
        ],
        '12' => [
            'id' => '12',
            'name' => '許諾転送',
            'type' => 'forward',
            'status' => '',
            'mail_cc' => '1',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\subject\\11.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\message\\11.php',
            'after' => ''
        ],
        '13' => [
            'id' => '13',
            'name' => '許諾完了返却',
            'type' => 'return',
            'status' => '1',
            'mail_cc' => '1',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\subject\\11.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\message\\11.php',
            'after' => ''
        ],
        '14' => [
            'id' => '14',
            'name' => 'コメント・返却',
            'type' => 'return',
            'status' => '',
            'mail_cc' => '1',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\subject\\11.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\message\\11.php',
            'after' => ''
        ],
        '15' => [
            'id' => '15',
            'name' => '前回処理取消',
            'type' => 'cancel',
            'status' => '',
            'mail_cc' => '1',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\subject\\11.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\message\\11.php',
            'after' => ''
        ],
        
        //DR
        '21' => [
            'id' => '21',
            'name' => '申請',
            'type' => 'new',
            'status' => '',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\subject\\21.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\message\\21.php',
            'after' => ''
        ],
        '22' => [
            'id' => '22',
            'name' => '許諾転送',
            'type' => 'forward',
            'status' => '',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\subject\\21.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\message\\21.php',
            'after' => ''
        ],
        '23' => [
            'id' => '23',
            'name' => '許諾完了返却',
            'type' => 'return',
            'status' => '1',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\subject\\21.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\message\\21.php',
            'after' => ''
        ],
        '24' => [
            'id' => '24',
            'name' => 'コメント・返却',
            'type' => 'return',
            'status' => '',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\subject\\21.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\message\\21.php',
            'after' => ''
        ],
        '25' => [
            'id' => '25',
            'name' => '前回処理取消',
            'type' => 'cancel',
            'status' => '',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\subject\\21.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\wf_new2\\message\\21.php',
            'after' => ''
        ],
        
        //見積台帳
        '31' => [
            'id' => '31',
            'name' => '申請',
            'type' => 'new',
            'status' => '',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\mitumori_inf2\\subject\\31.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\mitumori_inf2\\message\\31.php',
            'after' => ''
        ],
        '32' => [
            'id' => '32',
            'name' => '許諾転送',
            'type' => 'forward',
            'status' => '',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\mitumori_inf2\\subject\\31.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\mitumori_inf2\\message\\31.php',
            'after' => ''
        ],
        '33' => [
            'id' => '33',
            'name' => '許諾完了返却',
            'type' => 'return',
            'status' => '1',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\mitumori_inf2\\subject\\31.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\mitumori_inf2\\message\\31.php',
            'after' => ''
        ],
        '34' => [
            'id' => '34',
            'name' => 'コメント・返却',
            'type' => 'return',
            'status' => '',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\mitumori_inf2\\subject\\31.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\mitumori_inf2\\message\\31.php',
            'after' => ''
        ],
        
        //一般申請
        '41' => [
            'id' => '31',
            'name' => '申請',
            'type' => 'new',
            'status' => '',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\mail_syonin\\subject\\41.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\mail_syonin\\message\\41.php',
            'after' => ''
        ],
        '42' => [
            'id' => '32',
            'name' => '許諾転送',
            'type' => 'forward',
            'status' => '',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\mail_syonin\\subject\\41.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\mail_syonin\\message\\41.php',
            'after' => ''
        ],
        '43' => [
            'id' => '33',
            'name' => '許諾完了返却',
            'type' => 'return',
            'status' => '1',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\mail_syonin\\subject\\41.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\mail_syonin\\message\\41.php',
            'after' => ''
        ],
        '44' => [
            'id' => '34',
            'name' => 'コメント・返却',
            'type' => 'return',
            'status' => '',
            'mail_cc' => '',
            'subject' => TOP_PATH . '\\_config\common\\mail_client\\mail_syonin\\subject\\41.php',
            'message' => TOP_PATH . '\\_config\common\\mail_client\\mail_syonin\\message\\41.php',
            'after' => ''
        ],
    ],  //END action
];
