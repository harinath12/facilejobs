<?php

function hm_login(){

	$username = $_POST['username'];
	$password = md5($_POST['password']);

	$res = get_row("select * from users where (username = '$username' or email = '$username') and password = '$password'");

	if(isset($res['id'])){
		$res['profile'] = get_all_meta('users', $res['id']);
		return array('status' => 'Success', 'data' => $res);
	} else {
		return array('status' => 'Error', 'msg' => 'Invalid Credentials');
	}
}

function hm_users(){
	$res = get_results("select * from users where user_type = 3");
	$new_res = array();
	foreach ($res as $key => $value) {
		$value['profile'] = get_all_meta('users', $value['id']);
		unset($value['password']);
		$new_res[] = $value;
	}
	return array('status' => 'Success', 'data' => $new_res);
}

function hm_company(){
	$res = get_results("select * from users where user_type = 2 order by is_featured desc, id desc");
	$new_res = array();
	foreach ($res as $key => $value) {
		$value['profile'] = get_all_meta('users', $value['id']);
		$value['is_featured'] = $value['is_featured'] == 1;
		unset($value['password']);
		$new_res[] = $value;
	}
	return array('status' => 'Success', 'data' => $new_res);
}

function hm_save_user(){
	$profile = $_POST['profile'];
	$data = array(
		'username' => $_POST['username'],
		'email' => $_POST['email'],
		'user_type' => $_POST['user_type'],
		'updated_on' => date('Y-m-d H:i:s')
	);

	$data['is_featured'] = isset($_POST['is_featured']) ? 1 : 0;
	
	if(isset($_POST['id'])){
		if(isset($_POST['password'])){
			$data['password'] = md5($_POST['password']);
		}
		$id = $_POST['id'];
		update('users', $data, array('id' => $id));
		$res = array('status' => 'Success', 'msg' => 'Users Updated Successfully');
	} else {
		$data['password'] = md5($_POST['password']);
		$data['registered_on'] = date('Y-m-d H:i:s');
		$data['status'] = 1;
		insert('users', $data);
		$id = last_id();
		$res = array('status' => 'Success', 'msg' => 'Users Added Successfully');
	}

	//print_r($data);exit;

	foreach ($profile as $key => $value) {
		set_meta('users', $id, $key, $value);
	}

	return $res;
}

function hm_delete_user(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('users', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Users Deleted Successfully');
}

function hm_change_user_status(){
	update('users', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Users Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Users Unpublished Successfully');
	}
}

function hm_save_admin_profile(){
	
	if(isset($_POST['site_title'])){
		$arr = array('site_title', 'admin_email', 'meta_tag', 'meta_description');
		foreach ($arr as $key => $value) {
			set_meta('users', 1, $value, $_POST[$value]);
		}
	}

	return array('status' => 'Success', 'data' => get_all_meta('users', 1), 'msg' => 'Admin Profile updated Successfully');
}

function hm_change_password(){
	$dt = get_count('select * from users where id = 1 and password = "'.md5($_POST['old_password']).'"');
	
	if($dt){
		update('users', array('password' => md5($_POST['password'])), array('id' => $_GET['id']));
		return array('status' => 'Success', 'msg' => 'Password updated Successfully');
	} else {
		return array('status' => 'Error', 'msg' => 'Invalid Old Password');
	}
	
}

