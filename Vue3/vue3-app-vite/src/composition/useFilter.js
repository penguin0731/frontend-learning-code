import { ref, onMounted, onUnmounted, computed } from "vue";
import { filter } from "../util/todoStorage.js";

const validHash = ['all', 'active', 'completed'];
export default function useFilter(todosRef) {
    const visibilityRef = ref('all');

    const onHashchange = () => {
        const hash = location.hash.replace(/#\/?/, '');
        if(validHash.includes(hash)) {
            visibilityRef.value = hash;
        }else {
            console.log('hash无效');
            location.hash = '';
            visibilityRef.value = 'all';
        }
    }

    onMounted(() => {
        window.addEventListener('hashchange', onHashchange);
    });

    onUnmounted(() => {
        window.removeEventListener('hashchange,', onHashchange)
    });

    const filteredTodosRef = computed(() => {
        return filter(todosRef.value, visibilityRef.value);
    });

    const remaingRef = computed(() => {
        return filter(todosRef.value, 'active').length;
    });

    const completedRef = computed(() => {
        return filter(todosRef.value, 'completed').length;
    });

    return {
        visibilityRef,
        filteredTodosRef,
        remaingRef,
        completedRef
    }
}