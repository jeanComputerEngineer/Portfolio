declare module "bull" {
    export interface JobOptions {
        [key: string]: any;
    }

    export interface Job<T = any> {
        data: T;
        finished: () => Promise<any>;
    }

    export class Bull<T = any> {
        constructor(queueName: string, opts?: any);
        process(fn: (job: Job<T>) => Promise<any>): void;
        add(data: T, opts?: JobOptions): Promise<Job<T>>;
    }
    export default Bull;
}
