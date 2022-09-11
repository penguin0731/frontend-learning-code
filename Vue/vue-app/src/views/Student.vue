<template>
    <div class="student">
        <add-student></add-student>
        <student-List></student-List>
    </div>
</template>



<script>
// @代表src文件
import AddStudent from '@/components/student/AddStudent'
import StudentList from '@/components/student/StudentList'
export default {
    components: {
        AddStudent,
        StudentList
    },
}
</script>