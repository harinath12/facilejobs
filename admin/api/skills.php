<?php
/* Admin Side*/
function hm_skills(){
	$res = get_results("select * from skills");
	return array('status' => 'Success', 'data' => $res);
}

function hm_save_skill(){
	$data = $_POST;
	
	

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		update('skills', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Skill Updated Successfully');
	} else {
		$data['created_on'] = date('Y-m-d H:i:s');
		$data['status']= 1;
		insert('skills', $data);
		return array('status' => 'Success', 'msg' => 'Skill Added Successfully');
	}
}

function hm_delete_skill(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('skills', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Skill Deleted Successfully');
}

function hm_change_skill_status(){
	update('skills', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Skill Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Skill Unpublished Successfully');
	}
}