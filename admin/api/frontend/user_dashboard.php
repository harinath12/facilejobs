<?php
function hm_user_dashboard(){
	$data = array();
	$data['applied_jobs'] = get_count("select * from job_applicants where user_id = ".$_POST['user_id']);
	$data['shortlisted_jobs'] = get_count("select * from job_applicants where is_shortlisted = 1 and user_id = ".$_POST['user_id']);
	//$data['reviews'] = get_count("select * from reviews where type = 'user' and ref_id = ".$_POST['user_id']." group by user_id");
	$data['views'] = get_count("select * from views where type = 'user' and ref_id = ".$_POST['user_id']." group by user_id");
	$data['jobs'] = get_results("SELECT a.*, b.applied_on, b.shortlisted_on, b.shortlisted_on FROM `jobs` as a LEft join job_applicants as b on a.id = b.job_id WHERE b.user_id = ".$_POST['user_id']." order by b.applied_on asc limit 0,5");
	return array('status' => 'Success', 'data' => $data);
}

function hm_user_profile(){
	if(isset($_POST['first_name'])){
		foreach ($_POST as $key => $value) {
			set_meta('users', $_POST['user_id'], $key, $value);
		}
	}
	
	return array('status' => 'Success', 'data' => get_all_meta('users', $_POST['user_id']), 'msg' => 'Profile updated Successfully');
}

function hm_user_applied_job(){
	$data = get_results("SELECT a.*, b.applied_on, b.is_shortlisted, b.shortlisted_on FROM `jobs` as a LEft join job_applicants as b on a.id = b.job_id WHERE b.user_id = ".$_POST['user_id']." order by b.applied_on asc");
	return array('status' => 'Success', 'data' => $data);
}

function hm_user_shortlist_job(){
	$data = get_results("SELECT a.*, b.applied_on, b.is_shortlisted, b.shortlisted_on FROM `jobs` as a LEft join job_applicants as b on a.id = b.job_id WHERE b.is_shortlisted = 1 and b.user_id = ".$_POST['user_id']." order by b.shortlisted_on");
	return array('status' => 'Success', 'data' => $data);
}

function hm_user_alerts(){
	$data = get_results("SELECT a.*, b.alert_on, b.is_read FROM `jobs` as a LEft join alerts as b on a.id = b.job_id WHERE b.user_id = ".$_POST['user_id']." order by b.alert_on");
	return array('status' => 'Success', 'data' => $data);
}

function hm_view_candidate(){

	$data = get_all_meta('users', $_POST['id']);
	$data['basic'] = get_data_by_id('users', $_POST['id']);
	$data['no_of_views'] = get_count("select * from views where type = 'user' and ref_id = ".$_POST['id']." group by user_id");

	if(isset($_POST['user_id'])){
		$data['shortlisted'] = get_count("select * from job_applicants where is_selected = 1 and selected_by = ".$_POST['user_id']);
	}
	return array('status' => 'Success', 'data' => $data);
}

function hm_following_list(){
	$applicants = get_results("select * from following_employers where user_id = ".$_POST['user_id']);
	$new = [];
	foreach ($applicants as $key => $value) {
		$dd = array('id' => $value['company_id']);
		$arr = array('company_image', 'company_name', 'location', 'slug', 'founded');
		foreach ($arr as $key => $val) {
			$dd[$val] = get_meta('users', $value['company_id'], $val);
		}
		$new[] = $dd;
	}

	return array('status' => 'Success', 'data' => $new);
}

function hm_follow(){
	insert('following_employers', array('user_id' => $_POST['user_id'], 'company_id' => $_POST['company_id']));
	return array('status' => 'Success');
}

function hm_unfollow(){
	delete('following_employers', array('user_id' => $_POST['user_id'], 'company_id' => $_POST['company_id']));

	return array('status' => 'Success');
}

function hm_user_view(){
	if(isset($_POST['user'])){
		if($_POST['user'] != -1){
			$res = get_count("select * from views where type = 'user' and ref_id = ".$_POST['id']." and user_id = ".$_POST['user']);
			if($res == 0){
				$arr = array(
					'type' => 'user',
					'ref_id' => $_POST['id'],
					'user_id' => $_POST['user'],
					'view_on' => date('Y-m-d H:i:s')
				);
				insert('views', $arr);
			}
		} else {
			$arr = array(
				'type' => 'user',
				'ref_id' => $_POST['id'],
				'user_id' => $_POST['user'],
				'view_on' => date('Y-m-d H:i:s')
			);
			insert('views', $arr);
		}
	}	
	return array('status' => 'Success');
}