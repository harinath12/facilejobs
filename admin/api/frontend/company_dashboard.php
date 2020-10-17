<?php
function hm_company_jobs(){
	$res = get_results("select * from jobs where posted_by = ".$_POST['user_id']." order by id desc");

	$new = [];
	foreach ($res as $key => $value) {
		$value['company_name'] = get_meta('users', $value['posted_by'], 'company_name');
		$value['company_image'] = get_meta('users', $value['posted_by'], 'company_image');
		$value['no_of_applicants'] = get_count("select * from job_applicants where job_id = ".$value['id']." and is_applied = 1");

		$arr = array('industry', 'career_level', 'qualification', 'job_level', 'keywords', 'location');

		foreach ($arr as $key => $val) {
			$value[$val] = get_relative_data('jobs', $val, $value['id']);
		}

		$value['title'] = stripslashes($value['title']);
		$value['description'] = stripslashes($value['description']);

		$new[] = $value;
	}

	return array('status' => 'Success', 'data' => $new);
}

function hm_view_company(){
	$dd = explode('-',$_POST['id']);
	$id = array_shift($dd);
	$slug = implode('-', $dd);
	$res = get_results("select * from users where id = $id and slug = '$slug'");
	if(count($res)){
		$data = get_all_meta('users', $id);
		$data['basic'] = $res[0];
		$data['no_of_views'] = get_count("select * from views where type = 'company' and ref_id = ".$id." group by user_id");
		$data['no_of_posts'] = get_count("select * from jobs where posted_by = ".$id." order by id desc");
		$data['jobs'] = get_results("select * from jobs where posted_by = ".$id." order by id desc limit 0 ,6");

		if(isset($_POST['user_id'])){
			$data['following'] = get_count("select * from following_employers where company_id = ".$id." and user_id = ".$_POST['user_id']);
		}

		return array('status' => 'Success', 'data' => $data);
	} else {
		return array('status' => 'Error');
	}
	
}

function hm_company_profile(){
	if(isset($_POST['company_name'])){
		foreach ($_POST as $key => $value) {
			set_meta('users', $_POST['user_id'], $key, $value);
		}
		update('users', array('slug' => $_POST['slug']), array('id' => $_POST['user_id']));
	}
	
	return array('status' => 'Success', 'data' => get_all_meta('users', $_POST['user_id']), 'msg' => 'Profile updated Successfully');
}

function hm_company_dashboard(){
	$data = array();
	$data['no_of_posts'] = get_count("select * from jobs where posted_by = ".$_POST['user_id']." order by id desc");
	$data['shortlisted'] = get_count("select * from job_applicants where is_selected = 1 and selected_by = ".$_POST['user_id']);
	$data['reviews'] = get_count("select * from reviews where company_id = ".$_POST['user_id']." group by user_id");
	$data['following'] = get_count("select * from following_employers where company_id = ".$_POST['user_id']);
	$data['jobs'] = get_results("select * from jobs where posted_by = ".$_POST['user_id']." order by id desc limit 0 ,5");
	return array('status' => 'Success', 'data' => $data);
}

function hm_get_Applicants(){
	$applicants = get_results("select * from job_applicants where job_id = ".$_POST['job_id']." and is_applied = 1");
	$new = [];
	foreach ($applicants as $key => $value) {
		$dd = array('id' => $value['user_id']);
		$arr = array('profile_image', 'name', 'location');
		foreach ($arr as $key => $val) {
			$dd[$val] = get_meta('users', $value['user_id'], $val);
		}
		$new[] = $dd;
	}

	return array('status' => 'Success', 'data' => $new);
}

function hm_company_shortlist(){
	$applicants = get_results("select * from job_applicants where is_selected = 1 and selected_by = ".$_POST['user_id']);
	$new = [];
	foreach ($applicants as $key => $value) {
		$dd = array('id' => $value['user_id']);
		$arr = array('profile_image', 'name', 'location');
		foreach ($arr as $key => $val) {
			$dd[$val] = get_meta('users', $value['user_id'], $val);
		}
		$new[] = $dd;
	}

	return array('status' => 'Success', 'data' => $new);
}

function hm_remove_shortlist(){
	update('job_applicants', array('is_selected' => 0), array('user_id' => $_POST['user'], 'selected_by' => $_POST['emp']));

	return array('status' => 'Success');
}

function hm_company_view(){
	if(isset($_POST['user'])){
		if($_POST['user'] != -1){
			$res = get_count("select * from views where type = 'company' and ref_id = ".$_POST['company']." and user_id = ".$_POST['user']);
			if($res == 0){
				$arr = array(
					'type' => 'company',
					'ref_id' => $_POST['company'],
					'user_id' => $_POST['user'],
					'view_on' => date('Y-m-d H:i:s')
				);
				insert('views', $arr);
			}
		} else {
			$arr = array(
				'type' => 'company',
				'ref_id' => $_POST['company'],
				'user_id' => $_POST['user'],
				'view_on' => date('Y-m-d H:i:s')
			);
			insert('views', $arr);
		}
	}	
	return array('status' => 'Success');
}

function hm_add_review(){
	if(isset($_POST['rating'])){
		insert('reviews', array(
			'rating' => $_POST['rating'],
			'name' => $_POST['name'],
			'email' => $_POST['email'],
			'comments' => $_POST['comments'],
			'user_id' => $_POST['user_id'],
			'company_id' => $_POST['company_id'],
			'reviewed_on' => date('Y-m-d H:i:s')
		));

		return array('status' => 'Success');
	} else {
		return array('status' => 'Error');
	}
	
}

function hm_shortlist_candidate(){
	$res = get_results("select * from job_applicants where job_id in (select id from jobs where posted_by = ".$_POST['company_id'].") and user_id = ".$_POST['user_id']);
	
	if(count($res)){
		$arr = array(
			'is_selected' => 1,
			'selected_on' => date('Y-m-d H:i:s'),
			'selected_by' => $_POST['company_id']
		);
		update('job_applicants', $arr, array('id' => $res[0]['id']));
	} else {
		$arr = array(
			'selected_by' => $_POST['company_id'],
			'user_id' => $_POST['user_id'],
			'is_selected' => 1,
			'selected_on' => date('Y-m-d H:i:s')
		);
		insert('job_applicants', $arr);
	}
	return array('status' => 'Success');
}